"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post('/create-service', services_controller_1.serviceController.createService);
router.get('/', services_controller_1.serviceController.getAllServices);
router.get('/:id', services_controller_1.serviceController.getSingleService);
router.delete('/:id', services_controller_1.serviceController.deleteService);
router.patch('/:id', services_controller_1.serviceController.updateService);
exports.serviceRouter = router;
