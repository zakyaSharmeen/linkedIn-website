import express from "express";
import { logIn, logOut, signUp } from "../controllers/authControllers.js";

let authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.post("/logout", logOut);

export default authRouter;
