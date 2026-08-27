const AppError = require("../../utils/Class/appError");
const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("Request body:", req.body); // Log the request body for debugging

  const newReview = await Review.create({
    ...req.body,
    productID: req.params.productId,
  });
  res.status(201).json(newReview);
};

exports.getProductReviews = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging

  const reviews = await Review.find({ productID: req.params.productId }) // get reviews attached to each product
    .populate({ path: "userID", select: "username _id" });

  if (reviews.length === 0) {
    throw new AppError("No reviews found", 404);
  }
  res.status(200).json(reviews);
};

exports.getReview = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging

  const review = await Review.findOne({
    _id: req.params.reviewId,
    productID: req.params.productId,
  }).populate({ path: "userID", select: "username _id" });

  if (!review) {
    throw new AppError("Review doesn't exist", 404);
  }
  res.status(200).json(review);
};

exports.updateReview = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging
  console.log("Request body:", req.body); // Log the request body for debugging

  const review = await Review.findOneAndUpdate(
    { _id: req.params.reviewId, productID: req.params.productId },
    req.body,
    {
      returnDocument: 'after',
      runValidators: true,
    },
  );

  if (!review) {
    throw new AppError("Review not found", 404);
  }
  res.status(200).json(review);
};

exports.deleteReview = async (req, res) => {
  console.log("requested at:", req.requestTime); // Log the request time for debugging
  console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging

  const review = await Review.findOneAndDelete({
    _id: req.params.reviewId,
    productID: req.params.productId,
  });

  if (!review) {
    throw new AppError("Review not found", 404);
  }
  res.status(200).json({ message: "Review deleted successfully" });
};
