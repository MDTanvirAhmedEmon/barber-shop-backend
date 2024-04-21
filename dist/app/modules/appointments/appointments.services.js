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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma = new client_1.PrismaClient();
const makeAppointment = (paymentInfo, appointmentInfo, customer) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.appointment.findFirst({
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Barber is not available');
    }
    const customerAllInfo = yield prisma.customer.findUnique({
        where: {
            email: customer.email,
        },
    });
    if (!customerAllInfo) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Customer not found');
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = yield transactionClient.appointment.create({
            data: Object.assign(Object.assign({}, appointmentInfo), { customerId: customerAllInfo === null || customerAllInfo === void 0 ? void 0 : customerAllInfo.id }),
        });
        const profile = yield transactionClient.paymentInfo.create({
            data: Object.assign(Object.assign({}, paymentInfo), { appointmentId: newAppointment.id }),
        });
        return { newAppointment, profile };
    }));
    return result;
});
const getSpecificAppointment = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma.customer.findUnique({
        where: {
            email: user.email,
        },
    });
    if (!customer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield prisma.appointment.findMany({
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
});
const getAllAppointment = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.appointment.findMany({
        include: {
            paymentInfo: true,
            customer: true,
            barber: true,
            services: true,
            timeSlot: true,
        },
    });
    return result;
});
const updateAppointment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.appointment.update({
        where: {
            id,
        },
        data
    });
    return result;
});
exports.appointmentServices = {
    makeAppointment,
    getSpecificAppointment,
    getAllAppointment,
    updateAppointment,
};
