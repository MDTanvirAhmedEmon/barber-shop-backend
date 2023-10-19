import { Barber, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient()

const createBarber =async (data: Barber): Promise<Barber> => {
    const isExist = await prisma.barber.findFirst({
        where: {
            email: data.email
        }
    });
    if(isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
    
    const result = await prisma.barber.create({
        data,
    });

    return result;
};

const getSingleBarber = async (id: string): Promise<Barber | null> => {
    const result = await prisma.barber.findUnique({
        where: {
            id,
        }
    });

    return result;
};

const deleteBarber = async (id: string): Promise<Barber> => {
    const result = await prisma.barber.delete({
        where: {
            id,
        }
    });

    return result;
};

const updateBarber = async (data:Partial<Barber>, id: string): Promise<Barber> => {
    const result = await prisma.barber.update({
        where: {
            id,
        },
        data,
    });

    return result;
};

const getSAllBarber = async (): Promise<Barber[]> => {
    const result = await prisma.barber.findMany({});

    return result;
};

export const barberServices = {
    createBarber,
    getSingleBarber,
    getSAllBarber,
    deleteBarber,
    updateBarber,
};
