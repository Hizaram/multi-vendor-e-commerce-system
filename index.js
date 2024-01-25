"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./src/app"));
const PORT = process.env.PORT || 3000;
(0, typeorm_1.createConnection)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.error('TypeORM connection error: ', error));
