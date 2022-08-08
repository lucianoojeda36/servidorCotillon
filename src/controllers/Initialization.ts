import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';
import SaveCookies from './saveCookies';

let browser: any;

const Initialization = async (url = false) => {
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

  await page.waitForNavigation();

  const cookies = await page.cookies();

  SaveCookies(cookies);


};

export default Initialization



