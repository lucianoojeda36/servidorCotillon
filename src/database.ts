import { DataSource } from 'typeorm';
import { Products } from './models/products';
import * as dotenv from 'dotenv'
dotenv.config()




const AppDataSource : DataSource = new DataSource({
  type: 'mongodb',
  host: process.env.HOST, 
  port: 27017, 
  database: process.env.NAME_DATABASE,
  entities: [Products],
  synchronize: true,
  logging: ['query', 'error'],
  useUnifiedTopology:true,
  dropSchema:true,


});

export default AppDataSource


