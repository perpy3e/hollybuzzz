import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (err) {
    console.error("Database Connection Error:", err.message);
    process.exit(1); 
  }
};

export default connectDB;
