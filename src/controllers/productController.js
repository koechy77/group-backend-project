const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const { name, description, price, category, quantity, availability } =
      req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

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

    const products = await Product.find().populate({
      path: "reviews",
      populate: { path: "userID" }, // users associated with each review
    });
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
      populate: { path: "userID" }, // users associated with each review
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

    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true,
    });

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

    const product = await Product.findByIdAndDelete(req.params.id);

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
