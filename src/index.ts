// index.ts
// src/index.ts
import "reflect-metadata";
import { DataSourceOptions, createConnection } from 'typeorm';
import express from "express";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import * as config from "../ormconfig.json";

createConnection({
  ...(config.database as DataSourceOptions),
  entities: [User, Product],
}).then(connection => {
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);

  const app = express();
  app.use(express.json());

  // Create a new user
  app.post("/users", async (req, res) => {
    const { username } = req.body;
    const user = userRepository.create({ username });
    await userRepository.save(user);
    res.status(201).json(user);
  });

  // Get all users
  app.get("/users", async (req, res) => {
    const users = await userRepository.find({ relations: ["products"] });
    res.json(users);
  });

  // Add a product to the store
  app.post("/products", async (req, res) => {
    const { userId, name, price } = req.body;
    const user = await userRepository.findOne({ where: { id: userId } }) as User;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = productRepository.create({ name, price, user });
    await productRepository.save(product);
    res.status(201).json(product);
  });

  // Update product details
  app.put("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const { name, price } = req.body;
    const product = await productRepository.findOne({ where: { id: productId } }) as Product;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    await productRepository.save(product);
    res.json(product);
  });

  // Delete a product from the store
  app.delete("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = await productRepository.findOne({ where: { id: productId } }) as Product;
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.remove(product);
    res.json({ message: "Product deleted successfully" });
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
