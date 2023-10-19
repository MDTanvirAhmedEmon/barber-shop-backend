import { Admin } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { adminServices } from "./admin.services";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...data } = req.body;

    const result = await adminServices.createAdmin(data);
    sendResponse<Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    })
})

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await adminServices.getAllAdmin();
    sendResponse<Admin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get all admin successfully',
      data: result,
    })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const id = req.params.id;

    const result = await adminServices.updateAdmin(data, id);
    sendResponse<Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Updated successfully',
      data: result,
    })
})


const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

    const result = await adminServices.getSingleAdmin(id);
    sendResponse<Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'get single successfully',
      data: result,
    })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

    const result = await adminServices.deleteAdmin(id);
    sendResponse<Admin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: result,
    })
})


export const adminController = {
    createAdmin,
    getAllAdmin,
    updateAdmin,
    getSingleAdmin,
    deleteAdmin,
};

