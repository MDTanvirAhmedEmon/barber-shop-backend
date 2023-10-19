import express from 'express';
import { customerRouter } from '../modules/customer/customer.routes';
import { barberRouter } from '../modules/barber/barber.routes';
import { timeSlotRouter } from '../modules/timeSlot/timeSlot.routes';
import { serviceRouter } from '../modules/services/services.routes';
import { appointmentRouter } from '../modules/appointments/appointments.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { adminRouter } from '../modules/admin/admin.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/customers",
    routes: customerRouter,
  },
  {
    path: "/barbers",
    routes: barberRouter,
  },
  {
    path: "/timeslot",
    routes: timeSlotRouter,
  },
  {
    path: "/services",
    routes: serviceRouter,
  },
  {
    path: "/appointments",
    routes: appointmentRouter,
  },
  {
    path: "/auth",
    routes: authRouter,
  },
  {
    path: "/admin",
    routes: adminRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));

export default router;
