import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { customerServices } from './customer.services';
import pick from '../../../shared/pick';
import { Customer } from '@prisma/client';

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerProfile, ...customerData } = req.body;

  const result = await customerServices.createCustomer(
    customerProfile,
    customerData,
  );
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully',
    data: others,
  });
});

const getSAllCustomer = catchAsync(async (req: Request, res: Response) => {

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await customerServices.getSAllCustomer(options);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all customer successfully',
    data: result,
  })
})


const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
    
  const { id } = req.params;
  const result = await customerServices.getSingleCustomer(id);
  sendResponse<Customer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single customer successfully',
    data: result,
  })
})

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const result = await customerServices.deleteCustomer(id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete customer successfully',
    data: result,
  })
})

const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerProfile, ...customerData } = req.body;
  console.log(customerProfile)
  console.log(customerData)
  const { id } = req.params;
  const result = await customerServices.updateCustomer(customerProfile, customerData, id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update customer successfully',
    data: result,
  })
})



export const customerController = {
  createCustomer,
  getSAllCustomer,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
};
