import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js"; // connect db
import authRouter from "./routes/authRoutes.js"; // router user
import userRouter from "./routes/userRoutes.js"; //user name/verify

const app = express();
const port = process.env.PORT || 4040;

// Connect to db
connectDB();

const allowedOrigins = ['https://hollybuzz.onrender.com']

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

//API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// Start Server
app.listen(port, () => console.log(`Server started on Port: ${port}`));