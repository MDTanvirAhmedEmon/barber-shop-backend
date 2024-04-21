"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const appointments_controller_1 = require("./appointments.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/make-appointment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), appointments_controller_1.appointmentController.makeAppointment);
router.get('/get-customer-appointment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), appointments_controller_1.appointmentController.getSpecificAppointment);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), appointments_controller_1.appointmentController.getAllAppointment);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), appointments_controller_1.appointmentController.updateAppointment);
exports.appointmentRouter = router;
