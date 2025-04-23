const db = require("./db");
import app from "./server";
import dotenv from "dotenv";
dotenv.config();

const { dbConnection } = db;

const PORT = process.env.PORT || 3001;

dbConnection.sync({ force: true }).then(() => {
  console.log("🚀 > dbConnection synced");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
