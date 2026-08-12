const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: String,
        enum: ["available", "out-of-stock"],
        default: "available"
    },
    averageRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        min: 0,
        default: 0
    }
  },

  { timestamps: true },
);

module.exports = productSchema;
