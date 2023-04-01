import {Router} from "express";
import product from "../controller/productController";
const router =Router();
router.post('/addproduct',product.addproduct);
router.get('/search/query',product.searchProduct);
export default router;





