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
    await client.set('Product', JSON.stringify(response), {
      EX: 10,
    });

    res.send(response);
  } catch (error: any) {
    res.send(error.message);
  }
});

router.get('/productForName', async (req, res) => {
  const { name } = req.body;

  try {
    const reply = await client.get('productForName');

    if (reply) return res.send(JSON.parse(reply));

    const response = await AppDataSource.getRepository(Products).findOne({
      where: {
        description: { $regex: name, $options: 'i' },
      },
    } as any);

    await client.set('productForName', JSON.stringify(response), {
      EX: 10,
    });
    res.send(response);
  } catch (error: any) {
    res.send(error.message);
  }
});

export default router;
