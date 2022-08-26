import { DataSource } from 'typeorm';
import { Products } from './models/products';
import * as dotenv from 'dotenv';
dotenv.config();

const AppDataSource: DataSource = new DataSource({
  type: 'mongodb',
  url: process.env.NAME_HOST_DATABASE,
  entities: [Products],
  synchronize: true,
  logging: true,
  useUnifiedTopology: true,
  dropSchema: true,
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  poolSize: 10,
  j: true,
});

export default AppDataSource;
