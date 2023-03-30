import {Router} from"express";
import authRouter from"./auth.routers";
import productRouter from"./product.routers";
const router =Router();

router.use("/auth",authRouter);
router.use("/product",productRouter);
export default router