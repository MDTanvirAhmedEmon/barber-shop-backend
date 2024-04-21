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
exports.customerServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma = new client_1.PrismaClient();
const createCustomer = (customerProfile, customerData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(customerData);
    console.log(customerProfile);
    const isExist = yield prisma.customer.findUnique({
        where: {
            email: customerData.email,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exists');
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newCustomer = yield transactionClient.customer.create({
            data: customerData,
        });
        console.log(newCustomer.id);
        const profile = yield transactionClient.customerProfile.create({
            data: Object.assign(Object.assign({}, customerProfile), { customerId: newCustomer.id }),
        });
        //create access token & refresh token
        const payloadForToken = {
            fullName: newCustomer.fullName,
            email: newCustomer.email,
            role: newCustomer.role,
            password: newCustomer.password,
        };
        const accessToken = jwtHelpers_1.jwtHelpers.createToken(payloadForToken, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken(payloadForToken, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            newCustomer,
            profile,
            accessToken,
            refreshToken,
        };
    }));
    return result;
});
const getSAllCustomer = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma.customer.findMany({
        include: {
            customerProfile: true,
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma.customer.count({});
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findUnique({
        where: {
            id,
        },
        include: {
            customerProfile: true,
        },
    });
    return result;
});
const getCustomerInfo = (customerInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.customer.findUnique({
        where: {
            email: customerInfo.email,
        },
        include: {
            customerProfile: true,
        },
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCustomer = yield prisma.customer.findUnique({
        where: {
            id,
        },
        include: {
            customerProfile: true,
        },
    });
    if (!existingCustomer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
    }
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const profile = yield transactionClient.customerProfile.delete({
            where: {
                id: (_a = existingCustomer === null || existingCustomer === void 0 ? void 0 : existingCustomer.customerProfile) === null || _a === void 0 ? void 0 : _a.id,
            },
        });
        const deletedCustomer = yield transactionClient.customer.delete({
            where: {
                id,
            },
        });
        return {
            deletedCustomer,
            profile,
        };
    }));
    return result;
});
const updateCustomer = (customerProfile, customerData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedCustomer = yield transactionClient.customer.update({
            where: {
                id,
            },
            data: customerData,
        });
        const profile = yield transactionClient.customerProfile.update({
            where: {
                customerId: updatedCustomer.id,
            },
            data: customerProfile,
        });
        return {
            updatedCustomer,
            profile,
        };
    }));
    return result;
});
exports.customerServices = {
    createCustomer,
    getSAllCustomer,
    getCustomerInfo,
    getSingleCustomer,
    deleteCustomer,
    updateCustomer,
};
