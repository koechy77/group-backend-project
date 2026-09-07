const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../../utils/appError");

exports.signUp = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("Request body:", req.body); // Log the request body for debugging

  const user = await User.create(req.body);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(201).json({ status: "success", token, data: { user } });
};

exports.login = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("Request body:", req.body); // Log the request body for debugging

  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Please provide email, and password", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Incorrect email or password", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({ status: "success", token });
};
