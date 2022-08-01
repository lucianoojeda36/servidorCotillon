import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';
// import Exceljs from 'exceljs'
import fs from 'fs';

let browser;

let data: any = [];

let count = 0;

export const loginConColokies = async () => {
  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    userDataDir: 'C:UsersHPAppDataLocalGoogleChromeUser DataDefault',
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  const readCookie = fs.readFileSync('cookies.txt', 'utf8');

  const parseCookie = JSON.parse(readCookie);

  await page.setCookie(...parseCookie);

  await page.goto('https://www.cotilloncasaalberto.com.ar/pedido/carpeta_ver.php?buscar_txt=');

  await page.waitForSelector('#form');

  const objectNextButton = await page.$('div.paginacion > a.ir-pagina:last-child');

  // console.log('===objectNextButton==>',objectNextButton)

  const totalPages = await page.$('div.paginacion')

  const getTotalPages = await page.evaluate((totalPage:any) => totalPage.innerText, totalPages);

  console.log('getTotalpages===========>',getTotalPages.substring(getTotalPages.length - 10,getTotalPages.length-16))
  // console.log('getTotalpages===========>',getTotalPages)

  const getUrl = await page.evaluate(
    (objectNextButton: any) => objectNextButton.getAttribute('href'),
    objectNextButton
  );

  // console.log('==========geturl==========>', getUrl);

  const listaDeItems = await page.$$('div.producto_contenedor');

  // console.log('==========listaDeItems==========>', listaDeItems.length);
  // while (objectNextButton) {
    // console.log('entro====>')
    for (const item of listaDeItems) {
      const image = await item.$('div.producto > div > div > div > section > a > img');
      // const image = await item.$(".ui-search-result-image__element");
      // const name = await item.$(".ui-search-item__title");

      // const getPrice = await page.evaluate(objectoPrecio => objectoPrecio.innerText, objectoPrecio);

      // const getName = await page.evaluate(name => name.innerText, name);

      const getImage = await page.evaluate((image: any) => image.getAttribute('src'), image);

      data.push({
        // name: getName,
        // price: getPrice,
        image: getImage,
      });
    }
    count++;
  // }

  console.log('data==================>', data);
};

export const saveCookies = (data: any) => {
  // let cookies :any = []

  // data.map((value : any) => cookies.push(value))

  fs.writeFile('cookies.txt', JSON.stringify(data), err => {
    if (err) console.log(err);
  });
};

export const Initialization = async (url = false) => {
  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    userDataDir: 'C:UsersHPAppDataLocalGoogleChromeUser DataDefault',
    ignoreHTTPSErrors: true,
  });

  const page: puppeteer.Page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  await page.goto('https://www.cotilloncasaalberto.com.ar/');

  const loginInput = await page.waitForSelector('#login_usuario');

  const loginPassword = await page.waitForSelector('#login_clave');

  await loginInput?.type('jose');

  await loginPassword?.type('rosa301');

  await page.click('.i2_login_boton_ingresar');

  // const searchForm = await page.$('#form_i2_login')
  // await searchForm?.evaluate((searc:any)=> searc.submit())

  await page.waitForNavigation();

  // await page.click('input[type=submit]')

  const cookies = await page.cookies();

  saveCookies(cookies);

  // await browser.close()
};
