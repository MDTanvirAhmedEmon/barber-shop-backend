import { Appointment, PrismaClient } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const prisma = new PrismaClient()

const makeAppointment =async (data: Appointment): Promise<Appointment> => {

    const isExist = await prisma.appointment.findMany({
        where: {
          appointmentDate: data.appointmentDate,
          barberId: data.barberId,
          timeSlotId: data.timeSlotId,
        },
      });

    if(isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Barber is not available');
    }

    const result = await prisma.appointment.create({
        data,
    });

    return result;
};


export const appointmentServices = {
    makeAppointment,
};