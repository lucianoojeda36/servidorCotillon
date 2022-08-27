import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';
import SaveCookies from './saveCookiesController';
import * as dotenv from 'dotenv'
dotenv.config()


let browser: any;

const InitializationController: (url?: boolean) => Promise<void> = async (url = false) => {
  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: true,
    // args: ['--start-maximized'],
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ["--no-sandbox",'--use-gl=egl'],
    // args:['--no-sandbox'],
    // userDataDir: 'C:UsersHPAppDataLocalGoogleChromeUser DataDefault',
    // ignoreHTTPSErrors: true,
  });

  const page: puppeteer.Page = await browser.newPage();

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  await page.goto('https://www.cotilloncasaalberto.com.ar/');

  const loginInput: puppeteer.ElementHandle<Element> | null = await page.waitForSelector('#login_usuario');

  const loginPassword: puppeteer.ElementHandle<Element> | null= await page.waitForSelector('#login_clave');

  await loginInput?.type(process.env.USER_NAME as string);

  await loginPassword?.type(process.env.USER_PASSWORD as string);

  await page.click('.i2_login_boton_ingresar');

  await page.waitForNavigation();

  const cookies: puppeteer.Protocol.Network.Cookie[] = await page.cookies();

  SaveCookies(cookies);

  
};

export default InitializationController;
