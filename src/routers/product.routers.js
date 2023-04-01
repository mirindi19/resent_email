/**
* @swagger
* /product/search:
*   get:
*     summary: Search for a product
*     tags:
*       - Products
*     parameters:
*       - name: key
*         in: query
*         description: Product name
*         schema:
*           type: string
*       - name: minPrice
*         in: query
*         description: Minimum product price
*         schema:
*           type: number
*       - name: maxPrice
*         in: query
*         description: Maximum product price
*         schema:
*           type: number
*     responses:
*       "200":
*         description: Message  sent successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 code:
 *                  type: integer
 *                 message:
 *                  type: string
 *                 products:
 *                  type: object
*       "404":
*         description: product not found
*       "500":
*         description: Server Error
*/




import {Router} from "express";
import product from "../controller/productController";
const router =Router();
router.post('/addproduct',product.addproduct);
router.get('/search',product.searchProduct);
export default router;





