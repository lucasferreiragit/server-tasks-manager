const { Sequelize } = require("sequelize");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. Please check your .env file or environment variables."
  );
}

const isProduction = process.env.NODE_ENV !== "development";

console.log("🚀 > isProduction ==> ", isProduction);

const sequelizeConfig = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { sequelize: sequelizeConfig };
