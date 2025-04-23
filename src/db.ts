import { Sequelize } from "sequelize";

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const sequelizeConnection = require("./config/database");

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

const modelsFiles = fs
  .readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

modelsFiles.forEach((file: any) => {
  modelDefiners.push(require(path.join(__dirname, "/models", file)));
});

modelDefiners.forEach((model: any) => model(sequelizeConnection));

const entries = Object.entries(sequelizeConnection.models);

const capitalizedEntries = entries.map((entry: any) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelizeConnection.models = Object.fromEntries(capitalizedEntries);

module.exports = {
  ...sequelizeConnection.models,
  dbConnection: sequelizeConnection,
} as any;
