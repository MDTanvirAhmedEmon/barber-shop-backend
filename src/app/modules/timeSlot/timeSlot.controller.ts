import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { TimeSlot } from "@prisma/client";
import { timeSlotServices } from "./timeSlot.services";


const createTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await timeSlotServices.createTimeSlot(data);
    sendResponse<TimeSlot>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'timeSlot created successfully',
      data: result,
    })
  })

const deleteTimeSlot = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

    const result = await timeSlotServices.deleteTimeSlot(id);
    sendResponse<TimeSlot>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'timeSlot deleted successfully',
      data: result,
    })
  })

const getAllTimeSlot = catchAsync(async (req: Request, res: Response) => {

    const result = await timeSlotServices.getAllTimeSlot();
    sendResponse<TimeSlot[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all timeSlot successfully',
      data: result,
    })
  })

const availableTimeSlot = catchAsync(async (req: Request, res: Response) => {

  const {appointmentDate, barberId} = req.body;

    const result = await timeSlotServices.availableTimeSlot(appointmentDate, barberId);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get available timeSlot successfully',
      data: result,
    })
  })

export const timeSlotController = {
    createTimeSlot,
    deleteTimeSlot,
    getAllTimeSlot,
    availableTimeSlot,
};