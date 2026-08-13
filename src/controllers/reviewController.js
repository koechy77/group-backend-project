const Review = require("../models/reviewModel");

exports.createReview = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const { title, comment, rating, userID } = req.body;
    const newReview = await Review.create({
      ...req.body,
      productID: req.params.productId, // Use the productId from the route parameter
    });
    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging

    const reviews = await Review.find({ productID: req.params.productId }) // get reviews attached to each product
      .populate("userID")
      .populate("productID");

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getReview = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging

    const review = await Review.findOne({
      _id: req.params.reviewId,
      productID: req.params.productId,
    })
      .populate("userID")
      .populate("productID");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const review = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, productID: req.params.productId },
      req.body,
      {
        new: true,
      },
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.reviewId); // Log the requested review ID for debugging

    const review = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      productID: req.params.productId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
