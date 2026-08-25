const express = require("express");
const {
  createReview,
  getReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const router = express.Router({ mergeParams: true});

router.route("/").get(getProductReviews).post(createReview);
router.route("/:reviewId").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
