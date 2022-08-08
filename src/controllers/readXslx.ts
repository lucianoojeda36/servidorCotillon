import excelToJson from 'convert-excel-to-json';
import path from 'path';
import fs from 'fs';
import SaveProducts from './saveProducts';

const ReadXslx = async () => {
  let xlsx1 = path.resolve('download');

  const files: string[] = fs.readdirSync(xlsx1);

  const result: any = excelToJson({
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
    SaveProducts(Barcode, Description, Price)
  }

  console.log('product list was stored')
};

export default ReadXslx;
