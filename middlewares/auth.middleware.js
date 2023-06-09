const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startsWith("Bearer")) {
      throw Error("invalid token formate");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw Error("no token provided");
    }
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id });
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "invalid token" });
    } else {
      res.status(401).json({ error: "unauthorized access" });
    }
  }
};
module.exports = authMiddleware;
