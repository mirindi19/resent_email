import { Router } from "express";
import authController from"../controller/authController";
import checkUser from "../middelwares/checkUser";

const router = Router();

router.post("/login",checkUser,authController.Login);
router.post("/register",authController.signup);
router.put('/forgot-password',checkUser, authController.forgotPassword);
export default router