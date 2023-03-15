import {Router} from"express";
import authRouter from"./auth.routers";
const router =Router();

router.use("/auth",authRouter);
export default router