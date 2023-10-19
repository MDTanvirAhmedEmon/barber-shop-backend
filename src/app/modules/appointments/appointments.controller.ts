import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { Appointment } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { appointmentServices } from "./appointments.services";


const makeAppointment = catchAsync(async (req: Request, res: Response) => {
    const { paymentInfo, ...appointmentInfo } = req.body;

    const customer = req.user;

    const result = await appointmentServices.makeAppointment(paymentInfo, appointmentInfo, customer);
    sendResponse<Appointment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Appointment created successfully',
      data: result,
    })
})

const getSpecificAppointment = catchAsync(async (req: Request, res: Response) => {

    const user = req.user;
    console.log('hello',user);

    const result = await appointmentServices.getSpecificAppointment(user);
    sendResponse<Appointment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get appointments successfully',
      data: result,
    })
})

export const appointmentController = {
    makeAppointment,
    getSpecificAppointment,
};