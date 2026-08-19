const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middlewares/productMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    upload.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]),
    createProduct,
  );

router.route("/:productId").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
