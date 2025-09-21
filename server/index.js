// Load environment variables
import dotenv from "dotenv";
dotenv.config({ quiet: true });

// Core dependencies
import express from "express";
import cors from "cors";

// Local imports
import connectDb from "./config/connectDb.js";
import studentsRoute from "./routes/studentsRoute.js";

// App setup
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const DATABASE_URL = process.env.DATABASE_URL;

// Connect to database
connectDb(DATABASE_URL);

// Middleware
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for HTML form submissions
app.use(cors());

// Routes
app.use("/", studentsRoute);

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
