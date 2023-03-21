/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
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