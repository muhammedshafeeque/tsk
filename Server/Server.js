import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import Router from "./Router/index.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
connectDb();
app.use("/api", Router);
app.listen(process.env.PORT, () => {
  console.log("Server Running on Port " + process.env.PORT);
});
