import { Products } from '../models/products';

const SaveProducts: (Barcode: string, Description: string, Price: number) => Promise<void> = async (
  Barcode,
  Description,
  Price
) => {
  try {
    const products: Products = new Products();

    products.barcode = Barcode;
    products.description = Description;
    products.price = Price;

    await products.save();
  } catch (error) {
    console.log(error);
  }
};

export default SaveProducts;
