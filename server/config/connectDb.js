import mongoose from "mongoose";

// Connect to MongoDB database
const connectDb = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the application with failure code
  }
};

export default connectDb;
