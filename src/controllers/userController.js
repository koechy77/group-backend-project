const User = require("../models/userModel");
// const { id } = req.params;

exports.createUser = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    await User.create({ ...req.body, role: admin });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging

    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.userId); // Log the requested user ID for debugging

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.userId); // Log the requested user ID for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, req.body); // Update the user object with the new data
    await user.save(); // Save the updated user object

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.userId); // Log the requested user ID for debugging

    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
