import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Not Authorized, token expired. Please Login again." });
      return;
    }
  } else {
    res.status(401).json({ message: "There is no token attached to the header." });
    return;
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;

  try {
    const adminUser = await User.findOne({ email });

    if (adminUser.role !== "admin") {
      res.status(403).json({ message: "You are not an admin." });
      return;
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export { authMiddleware, isAdmin };