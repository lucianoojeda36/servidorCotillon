import { Products } from '../models/products';

const randomCode = () => {
  let num: string = Math.floor(Math.random()) + '';
  let prefixNum: string = '000000' + num;
  let finalNum: string = prefixNum;

  return finalNum;
};

const SaveProductsController: (Barcode: string, Description: string, Price: number , Image?:string) => Promise<void> = async (
  Barcode,
  Description,
  Price,
  Image
) => {
  try {
    const products: Products = new Products();

    products.barcode = Barcode ? Barcode : randomCode();
    products.description = Description;
    products.price = Price;
    products.image = Image ? Image : ''

    await products.save();
  } catch (error) {
    console.log(error);
  }
};

export default SaveProductsController;
