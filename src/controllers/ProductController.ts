// src/controllers/ProductController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entities/Product';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, userId } = req.body;

  const productRepository = getRepository(Product);

  try {
    const product = productRepository.create({ name, price, user: { id: userId } });
    await productRepository.save(product);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { productId } = req.params;
  const { name, price } = req.body;

  const productRepository = getRepository(Product);

  try {
    const product = await productRepository.findOne(productId, { relations: ['user'] });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    product.name = name || product.name;
    product.price = price || product.price;

    await productRepository.save(product);

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { productId } = req.params;

  const productRepository = getRepository(Product);

  try {
    const product = await productRepository.findOne(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    await productRepository.remove(product);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
