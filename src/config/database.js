const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, NODE_ENV } =
  process.env;

const isProduction = NODE_ENV === "production";

const sequelizeConfig = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

const config = sequelizeConfig[isProduction ? "production" : "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
  }
);

module.exports = sequelize;
