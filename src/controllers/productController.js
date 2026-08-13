const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    console.log("requested at:", req.requestTime); // Log the request time for debugging
    console.log("Request body:", req.body); // Log the request body for debugging

    const { name, description, price, category } = req.body;
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product({
      ...req.body,
      coverImage: req.file ? req.file.path : undefined, // Use the uploaded file path if available
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
      populate: { path: "userID" } // users associated with each review
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
      populate: { path: "userID" } // users associated with each review
    });
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
