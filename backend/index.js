import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(
    "Hello, World! zakya is here, and i am going to makke this project count i am sooooooo proud of u",
  );
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
