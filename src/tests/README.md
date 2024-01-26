# Unit Testing

## Description
This houses the test suites for the application

## Prerequisites
- Jest
- Supertest

### Project Structure
```css
projectDir/
├── tsconfig.json
├── ormconfig.json
├── package.json
└── src
    ├── entities
    │   ├── Product.ts
    │   └── User.ts
    ├── tests
    │   └── ormconfig.test.json
    │   └── unit
    │       ├── database.test.ts
    │       ├── product.test.ts
    │       └── user.test.ts
    └── index.ts
```

## Configuration
### Configure `ormconfig.test.json`
```json
{
  "database": {
    "type": "mysql",
    "host": "your_database_host",
    "port": 3306,
    "username": "your_test_database_username",
    "password": "your_test_database_password",
    "database": "your_test_database_name",
    "synchronize": true,
    "logging": true,
    "entities": ["src/entities/**/*.ts"]
  }
}
```
### Append to `package.json`
```json
{
 "scripts": {
	    "test": "NODE_ENV=test jest"
	   },
           "jest": {
                    "preset": "ts-jest",
                   "testEnvironment": "node"
           }
}
```

## Installation
### Install Jest
```bash
npm install --save-dev jest
```

### Install Supertest
```bash
npm install supertest
```

## Usage
### To run all tests
```bash
npm test
```

### To run individual tests
```bash
npm test "PATH_to_test_file"
```
