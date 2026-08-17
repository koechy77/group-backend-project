const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
    try {
      console.log("requested at:", req.requestTime);
      console.log("Request body:", req.body);
  
      const existingProduct = await Product.findOne({
        name: req.body.name,
      });
  
      if (existingProduct) {
        return res.status(400).json({
          message: "Product already exists",
        });
      }
  
      const product = await Product.create(req.body);
  
      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };


// get all products

  exports.getAllProducts = async (req, res) => {
    try {
      console.log("requested at:", req.requestTime);
  
      const products = await Product.find();
  
      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No products found",
        });
      }
  
      res.status(200).json(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  // get products
  exports.getProduct = async (req, res) => {
    try {
      console.log("requested at:", req.requestTime);
      console.log("requested id:", req.params.id);
  
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      res.status(200).json(product);
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  // update product

  exports.updateProduct = async (req, res) => {
    try {
      console.log("requested at:", req.requestTime);
      console.log("requested id:", req.params.id);
      console.log("Request body:", req.body);
  
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
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

  // delete product
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