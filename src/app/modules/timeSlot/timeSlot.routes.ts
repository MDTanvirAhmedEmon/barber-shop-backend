import express from "express";
import { timeSlotController } from "./timeSlot.controller";

const router = express.Router();

router.post('/create-timeslot', timeSlotController.createTimeSlot)
router.get('/', timeSlotController.getAllTimeSlot)
router.delete('/:id', timeSlotController.deleteTimeSlot)
router.post('/available-timeslot', timeSlotController.availableTimeSlot)


export const timeSlotRouter = router;