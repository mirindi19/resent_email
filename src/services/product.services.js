import {v4 as uuidv4 } from 'uuid';
import Models from "../db/models";
import { Op , Sequelize } from 'sequelize';

const {products} =Models;

export default class Products{
static async addProduct(data){
    let {
        name,
        description,
        quantity,
        price,
        category,
    }= data;
    const value = await products.create({
        id:uuidv4(),
        name,
        description,
        quantity,
        price,
        category,
    })
    return {value};
}


static async searchProducts(searchQuery, minPrice, maxPrice) {
    if (!minPrice) {
      minPrice = 1;
    }
    if (!maxPrice || maxPrice < minPrice) {
      maxPrice = Infinity;
    }
    if (!searchQuery) {
        searchQuery = '';
    }
    const product = await products.findAll({
    where : {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchQuery}%` } },
        { description: { [Op.iLike]: `%${searchQuery}%` } },
        { category: { [Op.iLike]: `%${searchQuery}%` } },
      ],
      price: { [Op.between]: [minPrice, maxPrice] },
    }
    });

    return product;
  }
}