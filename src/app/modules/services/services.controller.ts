import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { Service } from "@prisma/client";
import { ServiceServices } from "./services.services";


const createService = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await ServiceServices.createService(data);
    sendResponse<Service>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successfully',
      data: result,
    })
  })

const getAllServices = catchAsync(async (req: Request, res: Response) => {

    const result = await ServiceServices.getAllServices();
    sendResponse<Service[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all services successfully',
      data: result,
    })
  })

  
const getSingleService = catchAsync(async (req: Request, res: Response) => {
    
  const { id } = req.params;
  const result = await ServiceServices.getSingleService(id);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single service successfully',
    data: result,
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
    
  const { id } = req.params;
  const result = await ServiceServices.deleteService(id);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete service successfully',
    data: result,
  })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const { id } = req.params;
  const result = await ServiceServices.updateService(data, id);
  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update service successfully',
    data: result,
  })
})

export const serviceController = {
    createService,
    getAllServices,
    getSingleService,
    deleteService,
    updateService,
};
