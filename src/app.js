import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import mongoose from "mongoose";

env.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

//connect Db
await mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log(`DB connected!`))
  .catch((err) => console.log(err));

// routes declaration
app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoutes);

export default app;
