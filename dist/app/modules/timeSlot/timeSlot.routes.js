"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSlotRouter = void 0;
const express_1 = __importDefault(require("express"));
const timeSlot_controller_1 = require("./timeSlot.controller");
const router = express_1.default.Router();
router.post('/create-timeslot', timeSlot_controller_1.timeSlotController.createTimeSlot);
router.get('/', timeSlot_controller_1.timeSlotController.getAllTimeSlot);
router.delete('/:id', timeSlot_controller_1.timeSlotController.deleteTimeSlot);
router.post('/available-timeslot', timeSlot_controller_1.timeSlotController.availableTimeSlot);
exports.timeSlotRouter = router;
