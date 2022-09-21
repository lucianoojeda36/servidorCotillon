import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import AppDataSource from './database';
import InitializationController from './controllers/InitializationController';
import ScrapingController from './controllers/b&fDeco/scrapingController';
import ReadXslxCotillonController from './controllers/casaAlberto/readXslxController';
import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const port = process.env.PORT || 3000;

export const client = createClient({
  url: process.env.REDIS_URL,
});

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
  await fs.mkdirSync('./src/download/viento_norte', { recursive: true });
})();

AppDataSource.initialize().then(() => {
  InitializationController()
    .then(async () => {
      await ScrapingController();
      await ReadXslxCotillonController();
      console.log('database is running');
    })
    .catch(error => console.log(error));
  setInterval(() => {
    InitializationController()
      .then(async () => {
        await ScrapingController();
        await ReadXslxCotillonController();
        console.log('database is running');
      })
      .catch(error => console.log(error));
  }, 8.64e7);
});

app.listen(`${port}`, () => console.log(`server connected on port ${port}`));
