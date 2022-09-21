import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';
import * as dotenv from 'dotenv';
import DownloadFiles from './downloadFiles';
dotenv.config()


let browser: any;

const InitializationController: (url?: boolean) => Promise<void> = async (url = false) => {
  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: true,
    args:['--no-sandbox'],

  });

  const page: puppeteer.Page = await browser.newPage();

  const urlMain = 'https://www.cotilloncasaalberto.com.ar/pedido/descarga.php';

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  await page.goto(urlMain);

  const loginInput: puppeteer.ElementHandle<Element> | null = await page.waitForSelector('#login_usuario');

  const loginPassword: puppeteer.ElementHandle<Element> | null= await page.waitForSelector('#login_clave');

  await loginInput?.type(process.env.USER_NAME as string);

  await loginPassword?.type(process.env.USER_PASSWORD as string);

  await page.click('.button_login');

  await page.waitForSelector('#contenedor');

  DownloadFiles(page)

};

export default InitializationController;
