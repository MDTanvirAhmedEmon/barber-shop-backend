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


export const serviceController = {
    createService,
};
