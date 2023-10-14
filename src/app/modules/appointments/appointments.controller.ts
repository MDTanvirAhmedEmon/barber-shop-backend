import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { Appointment } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { appointmentServices } from "./appointments.services";


const makeAppointment = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await appointmentServices.makeAppointment(data);
    sendResponse<Appointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully',
      data: result,
    })
})

export const appointmentController = {
    makeAppointment,
};