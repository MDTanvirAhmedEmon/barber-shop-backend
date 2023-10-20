
import express from "express";
import { appointmentController } from "./appointments.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";


const router = express.Router();

router.post('/make-appointment', auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), appointmentController.makeAppointment)
router.get('/get-customer-appointment', auth(ENUM_USER_ROLE.CUSTOMER), appointmentController.getSpecificAppointment)
router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), appointmentController.getAllAppointment)
router.patch('/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), appointmentController.updateAppointment)


export const appointmentRouter = router;