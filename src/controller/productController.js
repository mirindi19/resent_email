import {v4 as uuidv4 } from 'uuid';
import Models from "../db/models";
import { Op } from 'sequelize';
const {products} =Models;
const addProduct = async (req, res) => {
  try {
    const {name,decribe,price} = req.body;
    const createproduct = await products.create({
        id:uuidv4(),
        name,
        decribe,
        price
    })
    return res.status(201).json({
        status:200,
        message:'product add ',
        data:createproduct
    })
  } catch (error) {
    res.status(500).json({
        status:500,
        message:"server error" + error.message
    })
  }
}

const searchProduct = async (req,res) => {
        const searchQuery = req.params
        console.log("search itemmm",searchQuery)
        try {
          const p = await products.findAll({
            where: {
              [Op.or]: [
                { name: { [Op.iLike]: `%${searchQuery}%` } },
                // { description: { [Op.iLike]: `%${searchQuery}%` } },
              ],
            },
            order: [['createdAt', 'DESC']],
            limit: 50,
          });
          res.status(200).json(p);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      

}
export {addProduct,searchProduct};