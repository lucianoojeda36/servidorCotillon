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

export const client = createClient();

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

InitializationController().then(async () => {
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

app.listen('3000', () => console.log('server connected on port 3000'));
