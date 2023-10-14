import { PrismaClient, TimeSlot,  } from "@prisma/client";

const prisma = new PrismaClient()

const createTimeSlot =async (data: TimeSlot): Promise<TimeSlot> => {
    const result = await prisma.timeSlot.create({
        data,
    });

    return result;
};

const availableTimeSlot =async (appointmentDate: any, barberId: string): Promise<any> => {

    const bookedAppointment = await prisma.appointment.findMany({
        where: {
          appointmentDate,
          barberId,
        },
        include: {
            timeSlot: true,
        }
      });

    console.log(bookedAppointment);

    const allTimeSlot = await prisma.timeSlot.findMany({});
    const bookedTimeSlotIds = bookedAppointment.map((appointment) => appointment.timeSlotId);
    console.log(bookedTimeSlotIds)

    const availableTimeSlots = allTimeSlot.filter((slot) => !bookedTimeSlotIds.includes(slot.id));
    return availableTimeSlots;
};


export const timeSlotServices = {
    createTimeSlot,
    availableTimeSlot,
};
