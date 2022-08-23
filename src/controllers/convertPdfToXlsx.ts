import path from 'path';
import fs from 'fs';
const PDFParser = require("pdf2json");

const convertPdfToXlsx: () => void =  () => {
  try {

    const xlsx1: string = path.resolve('download','viento_norte');

    const files: Array<string> = fs.readdirSync(xlsx1);

    let pdfParser = new PDFParser();
    
    pdfParser.on("pdfParser_dataError", (errData:any) => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", (pdfData:any) => {
  
    fs.writeFile(`${xlsx1}/F1040EZ.json`, JSON.stringify(pdfData),(res:any)=>{console.log(res)});
 
    });
    
    pdfParser.loadPDF(`${xlsx1}/${files[0]}`);

    

  } catch (err) {
    console.error(err);
  }
};

export default convertPdfToXlsx


