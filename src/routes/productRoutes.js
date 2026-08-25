const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  aliasTopProducts,
  getProductStats,
  getCategoryStats,
  getTopRatedProducts,
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
router.route("/top-5-cheap").get(aliasTopProducts, getAllProducts);
router.route("/stats").get(getProductStats);
router.route("/category-stats").get(getCategoryStats);
router.route("/top-rated").get(getTopRatedProducts);

router
  .route("/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
