import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { authServices } from "./auth.services";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await authServices.loginUser(loginData);
    const { refreshToken, ...others } = result;
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<any>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully!',
      data: others,
    });
  });

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);

    // set refresh token into cookie
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // };
  
    // res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<any>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully!',
      data: result,
    });
  });

export const authController = {
    loginUser,
    refreshToken,
};