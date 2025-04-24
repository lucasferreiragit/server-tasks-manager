import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./server";
import { sequelize } from "./config/database";

// Initialize database connection and sync models
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Database initialization error:", error);
    // Don't throw the error, just log it
  }
};

// Initialize database on cold start
initializeDatabase();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check database connection before handling request
    await sequelize.authenticate();
    return app(req, res);
  } catch (error) {
    console.error("Request handling error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Database connection failed",
    });
  }
}
