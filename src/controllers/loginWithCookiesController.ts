import path from "path";
import  Puppeteer  from "puppeteer";
import randomUseragent from 'random-useragent';
import fs from 'fs'



let browser: any;

let page: any;

const LoginWithCookiesController: (url?: boolean) => Promise<void> = async () => {
  const downloadPath : string = path.resolve('src','download','casa_alberto');
  

  const urlMain = 'https://www.cotilloncasaalberto.com.ar/pedido/descarga.php';

  const header: string | null= randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await Puppeteer.launch({
    headless: true,
    // args: ['--start-maximized'],
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ["--no-sandbox",'--use-gl=egl'],
    // args:['--no-sandbox'],
    // userDataDir: 'C:UsersHPAppDataLocalGoogleChromeUser DataDefault',
    // ignoreHTTPSErrors: true,
  });

  page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  const readCookie = fs.readFileSync('src/download/cookies/cookies.txt', 'utf8');

  const parseCookie = JSON.parse(readCookie);

  await page.setCookie(...parseCookie);

  await page.goto(urlMain);

  await page.waitForSelector('#contenedor');

  const objectNextButton = await page.$('div.descargas_tabla_fila:nth-child(12) > a.descargas_b_descargar');

  const getUrl: any = await page.evaluate(
    (objectNextButton: any) => objectNextButton.getAttribute('href'),
    objectNextButton
  );

  const client = await page.target().createCDPSession();

  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await Promise.all([await page.click('div.descargas_tabla_fila:nth-child(12) > a')]);
};

export default LoginWithCookiesController