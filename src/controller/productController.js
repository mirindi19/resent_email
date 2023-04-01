import Product from "../services/product.services";


 const addproduct= async(req,res) => {
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

const searchProduct = async (req, res) => {
  try {
    const products = await Product.searchProducts(
      req.query.key,
      req.query.minPrice,
      req.query.maxPrice,
    );
    if(products.length === 0){
      res.status(404).json({
        code:404,
        message: "product not found"
      })
    }
    res.status(200).json({
      code:200,
      message:"search list",
      products:products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export default {addproduct,searchProduct};

