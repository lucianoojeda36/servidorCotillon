import { DataSource } from 'typeorm';
import { Products } from './models/products';
import * as dotenv from 'dotenv';
import { Sessions } from './models/sessions';
dotenv.config();

const AppDataSource: DataSource = new DataSource({
  type: 'mongodb',
  database:'cotillon',
  url: process.env.NAME_HOST_DATABASE,
  entities: [Products,Sessions],
  synchronize: true,
  logging: true,
  useUnifiedTopology: true,
  dropSchema: true,
  useNewUrlParser: true,
});

export default AppDataSource;
