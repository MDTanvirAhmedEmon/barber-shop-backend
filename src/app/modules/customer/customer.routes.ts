import express from "express";
import { customerController } from "./customer.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.get('/customer-info',auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN)  , customerController.getCustomerInfo)
router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN) , customerController.getSAllCustomer)
router.get('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER)  , customerController.getSingleCustomer)

router.post('/create-customer', customerController.createCustomer)
router.delete('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER) , customerController.deleteCustomer)
router.patch('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.CUSTOMER) , customerController.updateCustomer)

export const customerRouter = router;