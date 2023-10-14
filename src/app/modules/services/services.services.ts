import { PrismaClient, Service } from "@prisma/client";

const prisma = new PrismaClient()

const createService =async (data: Service): Promise<Service> => {
    const result = await prisma.service.create({
        data,
    });

    return result;
};


export const ServiceServices = {
    createService,
};
