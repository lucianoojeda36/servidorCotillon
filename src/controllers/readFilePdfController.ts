const pdf2excel = require('pdf-to-excel');
import path from 'path';
import fs from 'fs';

const ReadFilePdfController = () => {
  const xlsx1: string = path.resolve('download');

  const files: Array<string> = fs.readdirSync(xlsx1);

  try {
    const options = {
      // when current pdf page number changes call this function(optional)
      onProcess: (e:any) => console.warn(`${e.numPage} / ${e.numPages}`),
      // pdf start page number you want to convert (optional, default 1)
      start: 1,
      // pdf end page number you want to convert (optional, default )
      end: 2,
    };

     pdf2excel.genXlsx(`${xlsx1}/${files[0]}`, `${xlsx1}/bar.xlsx`,options)
  } catch (err) {
    console.error(err);
  }
};

export default ReadFilePdfController;
