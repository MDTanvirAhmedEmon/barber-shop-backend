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
exports.ServiceServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const result = yield prisma.service.create({
        data,
    });
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findMany({});
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.findUnique({
        where: {
            id,
        }
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.delete({
        where: {
            id,
        }
    });
    return result;
});
const updateService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.service.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
exports.ServiceServices = {
    createService,
    getAllServices,
    getSingleService,
    deleteService,
    updateService,
};
