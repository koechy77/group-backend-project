const User = require("../models/userModel");
const AppError = require("../../utils/appError");

exports.getAllUsers = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging

  const users = await User.find();

  if (!users) {
    throw new AppError("no user found", 404);
  }
  res.status(200).json(users);
};

exports.getMe = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.user._id); // Log the requested user ID for debugging

  const user = await User.findById(req.user._id);

  res.status(200).json({ status: "success", data: { user } });
};

exports.getUser = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.params.userId); // Log the requested user ID for debugging

  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new AppError("user not found", 404);
  }
  res.status(200).json({ status: "success", data: { user } });
};

exports.updateMe = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("Request body:", req.body); // Log the request body for debugging

  const user = await User.findById(req.user._id);

  const { username, email } = req.body;

  Object.assign(user, ...req.body); // Update the user object with the new data
  await user.save(); // Save the updated user object

  res.status(200).json({ status: "success", data: { user } });
};

// exports.updateUser = async (req, res) => {
//   console.log("requested at:", req.requestTime); // Log the request time for debugging
//   console.log("requested id:", req.params.userId); // Log the requested user ID for debugging
//   console.log("Request body:", req.body); // Log the request body for debugging

//   const user = await User.findById(req.params.userId);

//   if (!user) {
//     throw new AppError("user not found", 404);
//   }

//   Object.assign(user, req.body); // Update the user object with the new data
//   await user.save(); // Save the updated user object

//   res.status(200).json(user);
// };

exports.deleteMe = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging

  await User.findByIdAndDelete(req.user._id);

  res.status(204).json({ status: "success", data: null });
};

exports.deleteUser = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.params.userId); // Log the requested user ID for debugging

  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    throw new AppError("user not found", 404);
  }
  res.status(204).json({ status: "success", data: null });
};
