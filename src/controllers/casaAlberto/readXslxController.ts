import excelToJson from 'convert-excel-to-json';
import path from 'path';
import fs from 'fs';
import SaveProducts from '../saveProductsController';

const ReadXslxCotillonController: () => Promise<void> = async () => {
  const xlsx1: string = path.resolve('download','casa_alberto');

  const files: Array<string> = fs.readdirSync(xlsx1);

  const result: {
    [key: string]: any[];
  } = excelToJson({
    sourceFile: `${xlsx1}/${files[0]}`,
    header: {
      rows: 9,
    },
    columnToKey: {
      A: 'Barcode',
      B: 'Description',
      C: 'Price',
    },
  });

  for (let product of result.rptPreciosExcelPagina) {
    let { Barcode, Description, Price } = product;
    SaveProducts(Barcode, Description, Price);
  }

  console.log('product list was stored');
};

export default ReadXslxCotillonController;
