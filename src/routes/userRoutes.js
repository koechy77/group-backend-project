const express = require("express");
const protect = require("../middlewares/protect");
const {
  getMe,
  getUser,
  getAllUsers,
  updateMe,
  // updateUser,
  deleteMe,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getAllUsers);
router
  .route("/:userId")
  .get(protect, getUser)
  // .patch(protect, updateUser)
  .delete(protect, deleteUser);
router.route("/profile").get(protect, getMe).patch(protect, updateMe).delete(protect, deleteMe);

module.exports = router;
