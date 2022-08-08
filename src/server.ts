import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import ReadXslx from './controllers/readXslx';
import AppDataSource from './database';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

AppDataSource.initialize()
  .then(() => {
    ReadXslx();
    console.log('database is running');
  })
  .catch(error => console.log(error));

app.listen('3000', () => console.log('server connected on port 3000'));
