/**
 * @swagger
 * tags:
 *   name: Forget Password
 *   description: Forget password API
 * /auth/forgot-password:
 *   put:
 *     summary: Forget password 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: "mirindisaidi19@gmail.com"
 *     responses:
 *       200:
 *         description: Message  sent successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 status:
 *                  type: integer
 *                 message:
 *                  type: string
 *                 data:
 *                  type: object
 *       500:
 *         description: Some server error
 */






import { Router } from "express";
import authController from"../controller/authController";
import checkUser from "../middelwares/checkUser";

const router = Router();

router.post("/login",checkUser,authController.Login);
router.post("/register",authController.signup);
router.put('/forgot-password',checkUser, authController.forgotPassword);
router.put('/reset-password/:token',authController.resetPassword);
export default router