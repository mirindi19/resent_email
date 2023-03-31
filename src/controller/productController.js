import Product from "../services/product.services";

export default class product {
  static async addproduct(req,res){
    try {
      const { error, value } = await Product.addProduct(
        req.body,
      );
      if (error) return res.status(400).json({ message: 'bad request', error });
      return res
      .status(201)
      .json({ message: 'product created', product: value });
    } catch (error) {
      return res.status(500).json({ message: 'server error', error });
    }
  }
}

