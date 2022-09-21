import path from 'path';

const DownloadFiles = async(page:any)=>{
  const downloadPath : string = path.resolve('src','download','casa_alberto');

  const objectPrecios1 = await page.$('div.descargas_tabla_fila:nth-child(11) > div.descargas_tabla_linea > span');
  const objectPrecios2 = await page.$('div.descargas_tabla_fila:nth-child(12) > div.descargas_tabla_linea > span');
  const objectPrecios3 = await page.$('div.descargas_tabla_fila:nth-child(13) > div.descargas_tabla_linea > span');
  
  const getObjectPrecios1 = await page.evaluate((objectPrecio:any) => objectPrecio.innerText, objectPrecios1);
  const getObjectPrecios2 = await page.evaluate((objectPrecio:any) => objectPrecio.innerText, objectPrecios2);
  const getObjectPrecios3 = await page.evaluate((objectPrecio:any) => objectPrecio.innerText, objectPrecios3);

  const client = await page.target().createCDPSession();

  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });


  getObjectPrecios1 === 'Precios' && await Promise.all([await page.click('div.descargas_tabla_fila:nth-child(11) > a')])
  getObjectPrecios2 === 'Precios' && await Promise.all([await page.click('div.descargas_tabla_fila:nth-child(12) > a')])
  getObjectPrecios3 === 'Precios' && await Promise.all([await page.click('div.descargas_tabla_fila:nth-child(13) > a')])

}

export default DownloadFiles