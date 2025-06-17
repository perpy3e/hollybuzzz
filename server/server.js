import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4040;

// Connect to MongoDB
connectDB();

// Path setup (for ES module resolution)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS config
const allowedOrigins = ['https://hollybuzz.onrender.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Serve frontend
// Serve React frontend build folder
app.use(express.static(path.join(__dirname, 'client')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
