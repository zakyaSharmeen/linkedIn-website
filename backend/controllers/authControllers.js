import genToken from "../config/token.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  //   res.send("Sign Up route");

  try {
    let { firstName, lastName, userName, email, password } = req.body;
    let existsEmail = await UserModel.findOne({ email });
    if (existsEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let existsUserName = await UserModel.findOne({ userName });
    if (existsUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    //hashing the pasword
    let hassedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hassedPassword,
    });

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export const logIn = async (req, res) => {
  //   res.send("Sign In route");

  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Signed In successfully", user });
  } catch (err) {
    return res.status(500).json({ "LogIn Error": err.message });
    console.log(err);
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged Out successfully" });
  } catch (err) {
    return res.status(500).json({ "LogOut Error": err.message });
    console.log(err);
  }
};
