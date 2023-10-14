import express from "express";
import { barberController } from "./barber.controller";


const router = express.Router();

router.post('/create-barber', barberController.createBarber)
router.get('/:id', barberController.getSingleBarber)

export const barberRouter = router;