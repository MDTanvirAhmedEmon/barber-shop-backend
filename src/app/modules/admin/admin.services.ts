import { Admin, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient()

const createAdmin =async (data: Admin): Promise<Admin> => {
    const isExist = await prisma.admin.findFirst({
        where: {
            email: data.email
        }
    });

    if(isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
    
    const result = await prisma.admin.create({
        data,
    });

    return result;
};

const getAllAdmin =async (): Promise<Admin[]> => {
    const allAdmin = await prisma.admin.findMany({});

    return allAdmin;
};

const updateAdmin =async (data: Partial<Admin>, id: string): Promise<Admin> => {
    const updatedAdmin = await prisma.admin.update({
        where: {
            id: id,
        },
        data,
    });

    return updatedAdmin;
};

const getSingleAdmin =async (id: string): Promise<Admin | null> => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id,
        },
    });

    return result;
};

const deleteAdmin =async (id: string): Promise<Admin> => {
    const result = await prisma.admin.delete({
        where: {
            id,
        }
    });

    return result;
};

export const adminServices = {
    createAdmin,
    getAllAdmin,
    updateAdmin,
    getSingleAdmin,
    deleteAdmin,
};