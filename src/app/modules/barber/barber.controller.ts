import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { Barber } from "@prisma/client"
import { barberServices } from "./barber.services"



const createBarber = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await barberServices.createBarber(data);
    sendResponse<Barber>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Barber created successfully',
      data: result,
    })
  })


const getSingleBarber = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const result = await barberServices.getSingleBarber(id);
    sendResponse<Barber>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get barber successfully',
      data: result,
    })
  })

const deleteBarber = catchAsync(async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const result = await barberServices.deleteBarber(id);
    sendResponse<Barber>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'delete barber successfully',
      data: result,
    })
  })

const updateBarber = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const { id } = req.params;
    const result = await barberServices.updateBarber(data, id);
    sendResponse<Barber>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'update barber successfully',
      data: result,
    })
  })

const getAllBarber = catchAsync(async (req: Request, res: Response) => {

    const result = await barberServices.getSAllBarber();
    sendResponse<Barber[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all barber successfully',
      data: result,
    })
  })


export const barberController = {
    createBarber,
    getSingleBarber,
    getAllBarber,
    deleteBarber,
    updateBarber,
}