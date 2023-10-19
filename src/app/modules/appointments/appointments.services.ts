import { Appointment, PaymentInfo, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const makeAppointment = async (
  paymentInfo: PaymentInfo,
  appointmentInfo: Appointment,
  customer: any,
): Promise<any> => {
  const isExist = await prisma.appointment.findFirst({
    where: {
      AND: [
        {
          appointmentDate: appointmentInfo.appointmentDate,
        },
        {
          barberId: appointmentInfo.barberId,
        },
        {
          timeSlotId: appointmentInfo.timeSlotId,
        },
      ],
    },
  });
  console.log(isExist);

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Barber is not available');
  }

  const customerAllInfo = await prisma.customer.findUnique({
    where: {
      email: customer.email,
    },
  });

  if (!customerAllInfo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Customer not found');
  }

  const result = await prisma.$transaction(async transactionClient => {
    const newAppointment = await transactionClient.appointment.create({
      data: {
        ...appointmentInfo,
        customerId: customerAllInfo?.id,
      },
    });

    const profile = await transactionClient.paymentInfo.create({
      data: {
        ...paymentInfo,
        appointmentId: newAppointment.id,
      },
    });

    return { newAppointment, profile };
  });

  return result;
};

const getSpecificAppointment = async(user: any):Promise<any> => {

  const customer = await prisma.customer.findUnique({
    where: {
      email: user.email,
    },
  });
  
  if ( !customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const result = await prisma.appointment.findMany({
    where: {
      customerId: customer.id,
    },
    include: {
      paymentInfo: true,
      customer: true,
      barber: true,
      services: true,
      timeSlot: true,
    },
  });

  return result;

};


export const appointmentServices = {
  makeAppointment,
  getSpecificAppointment,
};
