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
exports.adminServices = void 0;
const client_1 = require("@prisma/client");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma.admin.findFirst({
        where: {
            email: data.email
        }
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already exists');
    }
    const result = yield prisma.admin.create({
        data,
    });
    return result;
});
const getAllAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAdmin = yield prisma.admin.findMany({});
    return allAdmin;
});
const updateAdmin = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAdmin = yield prisma.admin.update({
        where: {
            id: id,
        },
        data,
    });
    return updatedAdmin;
});
const getSingleAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.admin.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.admin.delete({
        where: {
            id,
        }
    });
    return result;
});
exports.adminServices = {
    createAdmin,
    getAllAdmin,
    updateAdmin,
    getSingleAdmin,
    deleteAdmin,
};
