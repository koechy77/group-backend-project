const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../../utils/appError");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401,
    );
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded._id);

  if (!currentUser) {
    throw new AppError("user no longer exists", 401);
  }

  req.body = currentUser;
  next();
};

module.exports = protect;
