import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

//for env variables
dotenv.config();

const app = express();

//for parsing json data in request body
app.use(express.json());
//for parsing cookies
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send(
    "Hello, World! zakya is here, and i am going to makke this project count i am sooooooo proud of u",
  );
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
