import express from "express";
import { customerController } from "./customer.controller";

const router = express.Router();

router.post('/create-customer', customerController.createCustomer)

export const customerRouter = router;