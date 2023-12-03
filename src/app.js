import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

env.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// routes declaration
app.use("/auth/v1", authRoutes);
app.use("/user/v1", userRoutes);

export default app;
