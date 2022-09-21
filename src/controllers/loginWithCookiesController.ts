import  Puppeteer  from "puppeteer";
import randomUseragent from 'random-useragent';
import fs from 'fs'
import DownloadFiles from "./downloadFiles";



let browser: any;

let page: any;



const LoginWithCookiesController: (url?: boolean) => Promise<void> = async () => {

  const urlMain = 'https://www.cotilloncasaalberto.com.ar/pedido/descarga.php';

  const header: string | null= randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await Puppeteer.launch({
    headless: true,
    args:['--no-sandbox'],
  });

  page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  const readCookie = fs.readFileSync('src/download/cookies/cookies.txt', 'utf8');

  const parseCookie = JSON.parse(readCookie);

  await page.setCookie(...parseCookie);

  await page.goto(urlMain);

  await page.waitForSelector('#contenedor');

  DownloadFiles(page)

};

export default LoginWithCookiesController