import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectDB from "./db/index.js";
import cors from "cors"
dotenv.config();
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
