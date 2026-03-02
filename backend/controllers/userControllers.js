import UserModel from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "get current user error" });
  }
};
