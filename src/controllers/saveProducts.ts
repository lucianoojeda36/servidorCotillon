import AppDataSource from '../database';
import { Products } from '../models/products';

const SaveProducts: (Barcode: any, Description: any, Price: any) => void = async (Barcode, Description, Price) => {
  try {
    const products = new Products();

    products.barcode = Barcode;
    products.description = Description;
    products.price = Price;

    await products.save();

    
  } catch (error) {
    console.log(error);
  }
};

export default SaveProducts;
