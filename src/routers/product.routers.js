import {Router} from "express";
import product from "../controller/productController";
const router =Router();
router.post('/addproduct',product.addproduct);
export default router;