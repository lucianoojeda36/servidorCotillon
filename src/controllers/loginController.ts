import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';
// import Exceljs from 'exceljs'
import fs from 'fs'

let browser;

export const loginConColokies =async()=>{

  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    
  });

  const page:puppeteer.Page  = await browser.newPage();

  // await page.authenticate({ userProxy, passwordProxy });

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  // const readCookie = fs.ReadFyleSync('cookies.txt','utf8')

  const readCookie = fs.readFileSync('cookies.txt','utf8')


  const parseCookie = JSON.parse(readCookie)

  // console.log('parsecookie==========>',parseCookies)

  await page.setCookie(...parseCookie)


  await page.goto('https://www.cotilloncasaalberto.com.ar/pedido/carpeta_ver.php?idcarpeta=4005&idcarpeta_padre=4005&menu_1=4&menu_2=3&menu_3=4005');

  
}

export const saveCookies = (data:any)=>{

// let cookies :any = []

// data.map((value : any) => cookies.push(value))

fs.writeFile('cookies.txt',JSON.stringify(data),(err)=>{
  if(err) console.log(err)
})

}

export const Initialization = async (url = false) => {
  const header: any = randomUseragent.getRandom(ua => {
    return ua.browserName === 'Firefox';
  });

  browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    
  });

  const page:puppeteer.Page  = await browser.newPage();

  // await page.authenticate({ userProxy, passwordProxy });

  await page.setUserAgent(header);

  await page.setViewport({ width: 1366, height: 625 });

  // const readCookie = fs.ReadFyleSync('cookies.txt','utf8')

  await page.goto('https://www.cotilloncasaalberto.com.ar/');

  const loginInput = await page.waitForSelector('#login_usuario')

  const loginPassword = await page.waitForSelector('#login_clave')

  await loginInput?.type('jose')

  await loginPassword?.type('rosa301')

  await page.click('.i2_login_boton_ingresar')


  const cookies = await page.cookies()

  console.log('===========>',cookies)
  saveCookies(cookies)

  await browser.close()



};


// d532786f91730f6d36c2ccdf65e69749=6bnmqc5dphb2velgvjf5hlldpc; clients=p9modjvvgqg7hq0vdba1s3lnoi