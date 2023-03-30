import {Router} from "express";
import {addProduct,searchProduct} from "../controller/productController";
const router =Router();
router.post('/addproduct',addProduct);
router.get('/search/:searchQuery',searchProduct);
export default router;