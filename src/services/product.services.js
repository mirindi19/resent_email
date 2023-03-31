import {v4 as uuidv4 } from 'uuid';
import Models from "../db/models";
import { Op } from 'sequelize';
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
static async searchProduct(){
    
}
}