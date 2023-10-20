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
exports.barberServices = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const createBarber = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.barber.findFirst({
        where: {
            email: data.email
        }
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exists');
    }
    const result = yield prisma.barber.create({
        data,
    });
    return result;
});
const getSingleBarber = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.barber.findUnique({
        where: {
            id,
        }
    });
    return result;
});
const deleteBarber = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.barber.delete({
        where: {
            id,
        }
    });
    return result;
});
const updateBarber = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.barber.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const getSAllBarber = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.barber.findMany({});
    return result;
});
exports.barberServices = {
    createBarber,
    getSingleBarber,
    getSAllBarber,
    deleteBarber,
    updateBarber,
};
