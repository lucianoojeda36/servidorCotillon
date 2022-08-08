import { DataSource } from 'typeorm';
import { Products } from './models/products';


const AppDataSource : DataSource = new DataSource({
  type: 'mongodb',
  host: "localhost", 
  port: 27017, 
  database: 'cotillon',
  entities: [Products],
  synchronize: true,
  logging: ['query', 'error'],
  useUnifiedTopology:true,
});

export default AppDataSource


