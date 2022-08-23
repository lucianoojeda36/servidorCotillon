import path from 'path';
import fs from 'fs';
import excelToJson from 'convert-excel-to-json';
import SaveProducts from '../saveProductsController';

const ReadXslxController = async () => {
  const xlsx1: string = path.resolve('download/viento_norte');

  const files: Array<string> = fs.readdirSync(xlsx1);

  const result: {
    [key: string]: any[];
  } = await excelToJson({
    sourceFile: `${xlsx1}/bar.xlsx`,
    header: {
      rows: 11,
    },
    columnToKey: {
      A: 'Product',
    },
  });

  for (let i = 0; i < result.Sheet1.length - 2; i = i + 3) {
    let description = result.Sheet1[i].Product;
    let barcode = result.Sheet1[i + 1].Product;
    let price = result.Sheet1[i + 2].Product;

    SaveProducts(barcode, description, price);
  }

  console.log('termino de cargar productos Viento norte');
};

export default ReadXslxController;
