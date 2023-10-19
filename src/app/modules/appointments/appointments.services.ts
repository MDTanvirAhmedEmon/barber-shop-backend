import { Appointment, PaymentInfo, PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const prisma = new PrismaClient()

const makeAppointment =async (paymentInfo: PaymentInfo, appointmentInfo: Appointment): Promise<any> => {

    const isExist = await prisma.appointment.findFirst({
        where: {
            AND: [
                {
                    appointmentDate: appointmentInfo.appointmentDate
                },
                {
                    barberId: appointmentInfo.barberId
                },
                {
                    timeSlotId: appointmentInfo.timeSlotId
                },
            ]
        },
      });
      console.log(isExist);

    if(isExist){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Barber is not available');
    }

    const result = await prisma.$transaction(async transactionClient => {
        const newAppointment = await transactionClient.appointment.create({
            data: appointmentInfo
        });
    
        const profile = await transactionClient.paymentInfo.create({
            data: {
                ...paymentInfo,
                appointmentId: newAppointment.id
            }
        });
    

        return { newAppointment, profile };
    });
    

    return result;
};


export const appointmentServices = {
    makeAppointment,
};
