const db = require("./db");
import app from "./server";
require("dotenv").config();

const { dbConnection } = db;

const PORT = process.env.PORT || 3001;
// const isDevelopment = process.env.NODE_ENV === "development";

const syncOptions = {
  // ...(isDevelopment && { force: true }),
};

dbConnection
  .sync(syncOptions)
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  });
