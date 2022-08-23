import express, { Router } from 'express';
import { client } from './server';
import { Products } from './models/products';
import AppDataSource from './database';

const router: Router = express.Router();

router.get('/product', async (req, res, next) => {
  try {
    const reply = await client.get('product');
    if (reply) return res.send(JSON.parse(reply));

    const response = await AppDataSource.getRepository(Products).find();
    const saveResult = await client.set('Product', JSON.stringify(response), {
      EX: 10,
    });
    console.log(saveResult);

    res.send(response);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get('/', async (req, res) => {
  const response = await AppDataSource.getRepository(Products).find();
  res.send(response);
  // res.send('goal,sd')
});

export default router;
