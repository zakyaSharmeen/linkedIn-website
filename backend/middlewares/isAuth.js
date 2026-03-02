import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "user does not have token" });
    }
    let verifYToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifYToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("verifYToken", verifYToken);
    req.userId = verifYToken.userId;
    next();
  } catch (err) {
    return res.status(500).json({ message: "is auth error" });
  }
};
export default isAuth;
