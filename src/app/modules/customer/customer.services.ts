import { Customer, CustomerProfile, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();

const createCustomer = async (
  customerProfile: CustomerProfile,
  customerData: Customer,
): Promise<any> => {
  console.log(customerData);
  console.log(customerProfile);

  const isExist = await prisma.customer.findUnique({
    where: {
      email: customerData.email,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const result = await prisma.$transaction(async transactionClient => {
    const newCustomer = await transactionClient.customer.create({
      data: customerData,
    });

    console.log(newCustomer.id);

    const profile = await transactionClient.customerProfile.create({
      data: {
        ...customerProfile,
        customerId: newCustomer.id,
      },
    });

    //create access token & refresh token
    const payloadForToken = {
      fullName: newCustomer!.fullName,
      email: newCustomer!.email,
      role: newCustomer!.role,
      password: newCustomer!.password,
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
      newCustomer,
      profile,
      accessToken,
      refreshToken,
    };
  });

  return result;
};

const getSAllCustomer = async (options: IPaginationOptions): Promise<any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.customer.findMany({
    include: {
      customerProfile: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.customer.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleCustomer = async (id: string): Promise<Customer | null> => {
  
  const result = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      customerProfile: true,
    },
  });

  return result;
};

const getCustomerInfo = async (customerInfo: any): Promise<any> => {
  
  const result = await prisma.customer.findUnique({
    where: {
      email: customerInfo.email,
    },
    include: {
      customerProfile: true,
    },
  });

  return result;
};

const deleteCustomer = async (id: string): Promise<any> => {
  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id,
    },
    include: {
      customerProfile: true,
    },
  });

  if (!existingCustomer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }

  const result = await prisma.$transaction(async transactionClient => {

    const profile = await transactionClient.customerProfile.delete({
      where: {
        id: existingCustomer?.customerProfile?.id,
      },
    });

    const deletedCustomer = await transactionClient.customer.delete({
      where: {
        id,
      },
    });

    return {
      deletedCustomer,
      profile,
    };
  });

  return result;
};

const updateCustomer = async (
  customerProfile: Partial<CustomerProfile>,
  customerData: Partial<Customer>,
  id: string,
): Promise<any> => {
  const result = await prisma.$transaction(async transactionClient => {
    const updatedCustomer = await transactionClient.customer.update({
      where: {
        id,
      },
      data: customerData,
    });

    const profile = await transactionClient.customerProfile.update({
      where: {
        customerId: updatedCustomer.id,
      },
      data: customerProfile,
    });
    return {
      updatedCustomer,
      profile,
    };
  });

  return result;
};

export const customerServices = {
  createCustomer,
  getSAllCustomer,
  getCustomerInfo,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
};
