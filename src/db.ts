require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { sequelize: sequelizeConnection } = require("./config/database");

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

const modelsFiles = fs
  .readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: string) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
  );

modelsFiles.forEach((file: string) => {
  const modelPath = path.join(__dirname, "/models", file);
  const model = require(modelPath).default;
  modelDefiners.push(model);
});

// Initialize models
modelDefiners.forEach((model: any) => model(sequelizeConnection));

const entries = Object.entries(sequelizeConnection.models);
const capitalizedEntries = entries.map((entry: [string, any]) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelizeConnection.models = Object.fromEntries(capitalizedEntries);

const models = {
  ...sequelizeConnection.models,
  dbConnection: sequelizeConnection,
};

export const { Task, dbConnection } = models;
export default models;
