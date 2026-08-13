const express = require("express");
const {
  createReview,
  getReview,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);
router.route("/:reviewId").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
