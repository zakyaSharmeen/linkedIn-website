import express from "express";
import { getCurrentUser } from "../controllers/userControllers.js";
import isAuth from "../middlewares/isAuth.js";

let userRouter = express.Router();
userRouter.get("/current-user", isAuth, getCurrentUser);

export default userRouter;
