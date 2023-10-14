import { Barber, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

const createBarber =async (data: Barber): Promise<Barber> => {
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


export const barberServices = {
    createBarber,
    getSingleBarber,
};
