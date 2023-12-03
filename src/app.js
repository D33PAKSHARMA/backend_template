import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  res.json({ message: "Everything is ok" });
});

export default app;
