import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.post('/create-admin',auth(ENUM_USER_ROLE.SUPER_ADMIN), adminController.createAdmin)
router.get('/',auth(ENUM_USER_ROLE.SUPER_ADMIN) , adminController.getAllAdmin)
router.get('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN) , adminController.getSingleAdmin)
router.patch('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN) , adminController.updateAdmin)
router.delete('/:id',auth(ENUM_USER_ROLE.SUPER_ADMIN) , adminController.deleteAdmin)

export const adminRouter = router;