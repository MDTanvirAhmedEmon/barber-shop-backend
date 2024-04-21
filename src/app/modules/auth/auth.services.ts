import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const prisma = new PrismaClient();

const loginUser = async (payload: any): Promise<any> => {
  const { email, password } = payload;

  let isUserExist: any;

  const superAdmin = await prisma.superAdmin.findUnique({
    where: {
      email,
    },
  });
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const barber = await prisma.barber.findUnique({
    where: {
      email,
    },
  });

  const customer = await prisma.customer.findUnique({
    where: {
      email,
    },
  });

  if (  !admin && !superAdmin && !barber && !customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (superAdmin || admin || barber || customer) {
    isUserExist = superAdmin || admin || barber || customer;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect');
  }
  //create access token & refresh token
  const payloadForToken = {
    fullName: isUserExist!.fullName,
    email: isUserExist!.email,
    role: isUserExist!.role,
    password: isUserExist!.password,
  };

  const accessToken = jwtHelpers.createToken(
    payloadForToken,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    payloadForToken,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};


const refreshToken = async (token: string): Promise<any> => {

    if(!token){
        throw new ApiError(httpStatus.FORBIDDEN, 'Token is required');
    }

    let verifiedToken = null;
  
    try {
      verifiedToken = jwtHelpers.verifyToken(
        token,
        config.jwt.refresh_secret as Secret
      );
    } catch (err) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }
  
    const { email } = verifiedToken;

    let isUserExist: any;

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
  
    const barber = await prisma.barber.findUnique({
      where: {
        email,
      },
    });
  
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });
  
    if (!admin && !barber && !customer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
  
    if (admin || barber || customer) {
      isUserExist = admin || barber || customer;
    }
    const payloadForToken: any = {
        fullName: isUserExist!.fullName,
        email: isUserExist!.email,
        role: isUserExist!.role,
        password: isUserExist!.password,
      };
  
    const newAccessToken = jwtHelpers.createToken(
      payloadForToken,
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  
    return {
      accessToken: newAccessToken,
    };
  };




export const authServices = {
    loginUser,
    refreshToken,
};