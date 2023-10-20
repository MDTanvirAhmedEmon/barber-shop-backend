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
exports.authServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    let isUserExist;
    const superAdmin = yield prisma.superAdmin.findUnique({
        where: {
            email,
        },
    });
    const admin = yield prisma.admin.findUnique({
        where: {
            email,
        },
    });
    const barber = yield prisma.barber.findUnique({
        where: {
            email,
        },
    });
    const customer = yield prisma.customer.findUnique({
        where: {
            email,
        },
    });
    if (!admin && !superAdmin && !barber && !customer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (superAdmin || admin || barber || customer) {
        isUserExist = superAdmin || admin || barber || customer;
    }
    if (isUserExist && isUserExist.password !== password) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is incorrect');
    }
    //create access token & refresh token
    const payloadForToken = {
        fullName: isUserExist.fullName,
        email: isUserExist.email,
        role: isUserExist.role,
        password: isUserExist.password,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(payloadForToken, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(payloadForToken, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Token is required');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { email } = verifiedToken;
    let isUserExist;
    const admin = yield prisma.admin.findUnique({
        where: {
            email,
        },
    });
    const barber = yield prisma.barber.findUnique({
        where: {
            email,
        },
    });
    const customer = yield prisma.customer.findUnique({
        where: {
            email,
        },
    });
    if (!admin && !barber && !customer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (admin || barber || customer) {
        isUserExist = admin || barber || customer;
    }
    const payloadForToken = {
        fullName: isUserExist.fullName,
        email: isUserExist.email,
        role: isUserExist.role,
        password: isUserExist.password,
    };
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(payloadForToken, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.authServices = {
    loginUser,
    refreshToken,
};
