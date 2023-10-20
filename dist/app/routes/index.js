"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_routes_1 = require("../modules/customer/customer.routes");
const barber_routes_1 = require("../modules/barber/barber.routes");
const timeSlot_routes_1 = require("../modules/timeSlot/timeSlot.routes");
const services_routes_1 = require("../modules/services/services.routes");
const appointments_routes_1 = require("../modules/appointments/appointments.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/customers",
        routes: customer_routes_1.customerRouter,
    },
    {
        path: "/barbers",
        routes: barber_routes_1.barberRouter,
    },
    {
        path: "/timeslot",
        routes: timeSlot_routes_1.timeSlotRouter,
    },
    {
        path: "/services",
        routes: services_routes_1.serviceRouter,
    },
    {
        path: "/appointments",
        routes: appointments_routes_1.appointmentRouter,
    },
    {
        path: "/auth",
        routes: auth_routes_1.authRouter,
    },
    {
        path: "/admin",
        routes: admin_routes_1.adminRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
