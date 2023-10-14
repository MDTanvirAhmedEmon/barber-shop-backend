import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { customerServices } from "./customer.services"


const createCustomer = catchAsync(async (req: Request, res: Response) => {
    const { customerProfile, ...customerData } = req.body;

    const result = await customerServices.createCustomer(customerProfile, customerData);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer created successfully',
      data: result,
    })
  })


export const customerController = {
    createCustomer,
}