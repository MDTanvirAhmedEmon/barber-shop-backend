import { PrismaClient, Service } from "@prisma/client";

const prisma = new PrismaClient()

const createService =async (data: Service): Promise<Service> => {
    console.log(data)
    const result = await prisma.service.create({
        data,
    });

    return result;
};

const getAllServices =async (): Promise<Service[]> => {
    const result = await prisma.service.findMany({});

    return result;
};
const getSingleService= async (id: string): Promise<Service | null> => {
    const result = await prisma.service.findUnique({
        where: {
            id,
        }
    });

    return result;
};

const deleteService = async (id: string): Promise<Service> => {
    const result = await prisma.service.delete({
        where: {
            id,
        }
    });

    return result;
};

const updateService= async (data:Partial<Service>, id: string): Promise<Service> => {
    const result = await prisma.service.update({
        where: {
            id,
        },
        data,
    });

    return result;
};

export const ServiceServices = {
    createService,
    getAllServices,
    getSingleService,
    deleteService,
    updateService,
};
