"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSlotServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTimeSlot = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.timeSlot.create({
        data,
    });
    return result;
});
const deleteTimeSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.timeSlot.delete({
        where: {
            id,
        }
    });
    return result;
});
const getAllTimeSlot = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.timeSlot.findMany({});
    return result;
});
const availableTimeSlot = (appointmentDate, barberId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookedAppointment = yield prisma.appointment.findMany({
        where: {
            appointmentDate,
            barberId,
        },
        include: {
            timeSlot: true,
        }
    });
    console.log(bookedAppointment);
    const allTimeSlot = yield prisma.timeSlot.findMany({});
    const bookedTimeSlotIds = bookedAppointment.map((appointment) => appointment.timeSlotId);
    console.log(bookedTimeSlotIds);
    const availableTimeSlots = allTimeSlot.filter((slot) => !bookedTimeSlotIds.includes(slot.id));
    return availableTimeSlots;
});
exports.timeSlotServices = {
    createTimeSlot,
    deleteTimeSlot,
    getAllTimeSlot,
    availableTimeSlot,
};
