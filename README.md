# Multi-vendor E-Commerce Application

## Description
A simple multi-vendor e-commerce application where sellers can create, modify, and delete their products on the platform.

## Features
- User/Seller creation
- Product creation mapped to a user
- Product details modification
- Product deletion

## Getting Started
Clone the repository using the following command:
```bash
git clone <repository_link>
```

## Prerequisites
- Ubuntu 20.04 LTS or higher
- Node.js
- TypeScript
- TypeORM
- MySQL
- Express
- Jest

## Installation
Install all dependencies using the `package.json` file:
```bash
npm install
```
Or install manually:
- Install Express, TypeORM, MySQL, and other dependencies using:
  ```bash
  npm install express typeorm reflect-metadata mysql
  ```
- Install and add Express type definitions to `package.json` using:
  ```bash
  npm i --save-dev @types/express
  ```
- Install typescript-node using:
  ```bash
  npm install -g ts-node
  ```
- Install TypeScript:
  ```bash
  npm install typescript
  ```

## Configuration
### Project Structure
```css`
projectDir/
├── tsconfig.json
├── ormconfig.json
├── package.json
└── src
├── entities
│ ├── Product.ts
│ └── User.ts
├── tests
│ └── unit
│ ├── database.test.ts
│ ├── product.test.ts
│ └── user.test.ts
└── index.ts
```

### Configure `ormconfig.json`
```json
{
  "database": {
    "type": "mysql",
    "host": "your_database_host",
    "port": 3306,
    "username": "your_database_username",
    "password": "your_database_password",
    "database": "your_database_name",
    "synchronize": true,
    "logging": true,
    "entities": ["src/entities/**/*.ts"]
  }
}
```
Remember to replace the host, username, password and database credentials with yours

### Configure `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  }
}
```

## Usage
### Start the server
```bash
npm start
```

### Create User
```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": ""}' http://localhost:3000/users
```
Success: Returns a JSON with user_id and username.

### Get all Users
```bash
curl http://localhost:3000/users
```
Success: Returns a JSON with all users and their products.

### Create a Product
```bash
curl -X POST -H "Content-Type: application/json" -d '{"userId": user_id, "name": "product_name", "price": price_of_product}' http://localhost:3000/products
```
Success: Returns a JSON with user_id, product_id, name, and price.

### Modify Product's Details
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "new_product_name", "price": new_product_price}' http://localhost:3000/products/product_id
```
Success: Returns a JSON with user_id, product_id, new_product_name, and new_product_price.

### Delete a Product
```bash
curl -X DELETE http://localhost:3000/products/product_id
```
Success: Returns a "product has been deleted successfully" message

### Get All Products
```bash
curl http://localhost:3000/products
```
Success: Returns a JSON with all products in the database.
