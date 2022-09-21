import Puppeteer from 'puppeteer';
import randomUseragent from 'random-useragent';
import SaveProducts from '../saveProductsController';

let browser: any;

let page: any;

let pageIndex: any = 1;

let pagesForScreen: any = 1;

const ScrapingController: () => Promise<void> = async () => {
  const urlMain = `https://www.byfdeco.com/listado/g=0;m=75,73,71,74;or=5;c=2;h=1;e=6;b=1;A_PAGENUMBER=${pageIndex};st=ENVASES%20CON%20TAPA;cat_id=51;/GlobalBluePoint-ERP.aspx`;

  const header: string | null = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await Puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    
  });

  page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  if (pageIndex <= pagesForScreen) {

    await page.goto(urlMain);

    const listaDeItems  = await page.$$('div.col-md-4.col-sm-6.col-xs-12 > div.prodgrid');

    const totalPages = await page.$('#totArt');

    const getTotalPages = await page.evaluate((totalPages: any) => totalPages.innerText, totalPages);

    pagesForScreen = getTotalPages / 60;

    for (const item of listaDeItems) {
      const image = await item.$('div.thumbnail_container > div.thumbnail > a > img');
      const name = await item.$('div.caption.capgrid > a > h4');
      const price = await item.$('div.caption.capgrid > div.row.nov1body > h2');
      const barCode = await item.$('div.caption.capgrid > div.row.nov1body > h5');

      const getPrice = await page
        .evaluate((price: any) => price.innerText, price)
        .then((res: any) => Number(res.slice(4)));

      const getBarcode = await page
        .evaluate((barCode: any) => barCode.innerText, barCode)
        .then((res: any) => res.slice(5));

      const getName = await page.evaluate((name: any) => name.innerText, name);

      const getImage = await page.evaluate((image: any) => image.getAttribute('src'), image);

      await SaveProducts(getBarcode, getName, getPrice, getImage);

    }

    pageIndex++;

    ScrapingController();
 
    await browser.close();
  }
};

export default ScrapingController;
