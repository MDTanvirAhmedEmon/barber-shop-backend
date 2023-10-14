import express from "express";
import { appointmentController } from "./appointments.controller";

const router = express.Router();

router.post('/make-appointment', appointmentController.makeAppointment)


export const appointmentRouter = router;