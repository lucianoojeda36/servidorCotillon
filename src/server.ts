import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import AppDataSource from './database';
import InitializationController from './controllers/InitializationController';
import ScrapingController from './controllers/b&fDeco/scrapingController';
import ReadXslxController from './controllers/vientoNorte/readXslxController';
import ReadXslxCotillonController from './controllers/casaAlberto/readXslxController';
import LoginWithCookiesController from './controllers/loginWithCookiesController';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
require('events').EventEmitter.prototype._maxListeners = 0;

const port = process.env.PORT || 3000;

export const client = createClient({
  url: process.env.REDIS_URL,
});

// export const client = createClient();
(async () => {
  client.on('connect', function () {
    console.log('connected');
  });

  await client.connect();
})();

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

(async () => {
  await fs.mkdirSync('./src/download/casa_alberto', { recursive: true });
  await fs.mkdirSync('./src/download/cookies', { recursive: true });
  await fs.mkdirSync('./src/download/viento_norte', { recursive: true });
})();

const checkIsCookieExist = () => {
  const readCookie = fs.existsSync('src/download/cookies/cookies.txt');
  const readCookieExist = readCookie ? true : false;
  return readCookieExist;
};

checkIsCookieExist()
  ? LoginWithCookiesController().then(() => {
      AppDataSource.initialize()
        .then(async () => {
          await ScrapingController();
          // ReadXslxController();
          await ReadXslxCotillonController();

          await console.log('database is running');
        })
        .catch(error => console.log(error));
    })
  : InitializationController().then(async () => {
      await LoginWithCookiesController();

      AppDataSource.initialize()
        .then(async () => {
          await ScrapingController();
          // ReadXslxController();
          await ReadXslxCotillonController();

          await console.log('database is running');
        })
        .catch(error => console.log(error));
    });

app.listen(`${port}`, () => console.log(`server connected on port ${port}`));
