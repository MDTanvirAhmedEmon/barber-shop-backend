import express from "express";
import { barberController } from "./barber.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";


const router = express.Router();

router.post('/create-barber',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), barberController.createBarber)
router.get('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BARBER,ENUM_USER_ROLE.CUSTOMER ), barberController.getSingleBarber)
router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BARBER, ENUM_USER_ROLE.CUSTOMER), barberController.getAllBarber)
router.delete('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), barberController.deleteBarber)
router.patch('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BARBER), barberController.updateBarber)

export const barberRouter = router;