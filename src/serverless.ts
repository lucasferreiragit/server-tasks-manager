import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./server";
import { sequelize } from "./config/database";

// Initialize database connection and sync models
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Initialize database on cold start
initializeDatabase();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
