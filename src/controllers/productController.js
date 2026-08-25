const Product = require("../models/productModel");
const APIFeatures = require("../../utils/APIFeatures");

exports.aliasTopProducts = (req, res, next) => {
  req.query = {
    ...req.query,
    // limit: "5",
    sort: "price",
    fields: "name,price,availability,averageRating",
  };
  next();
};

exports.createProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const product = new Product({
      ...req.body,
      coverImage: req.files?.coverImage?.[0]?.path || undefined, // Use the uploaded cover image file path if available
      images: req.files?.images?.map((file) => file.path) || [], // Use the uploaded image file paths if available
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging")

    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .fields()
      .populate({
        path: "reviews",
        select: "title comment rating createdAt userID -_id",
        populate: { path: "userID", select: "username _id" }, // users associated with each review
      });

    const products = await features.query;
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("requested id:", req.params.productId); // Log the requested product ID for debugging

    const product = await Product.findById(req.params.productId).populate({
      path: "reviews",
      select: "title comment rating createdAt -_id",
      populate: { path: "userID", select: "username _id" }, // users associated with each review
    });

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime);
    console.log("requested id:", req.params.productId);
    console.log("Request body:", req.body);

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime);
    console.log("requested id:", req.params.id);

    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getProductStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          minimumPrice: { $min: "$price" },
          maximumPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          productCount: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          minimumPrice: { $min: "$price" },
          maximumPrice: { $max: "$price" },
        },
      },
      {
        $sort: { productCount: -1 },
      },
    ]);
    res.status(200).json(stats);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productID",
          as: "reviews",
        },
      },
      {
        $unwind: "$reviews",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          price: { $first: "$price" },
          averageRating: { $avg: "$reviews.rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);
    res.status(200).json(products);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
