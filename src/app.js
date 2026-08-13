const express = require("express");
const app = express();
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// global middleware
app.use(express.json()); /* body parser */
app.use(morgan("tiny")); /* logger */

// global custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

// mounted routes
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
app.use("/api/v1/:productId/reviews", reviewRouter);

module.exports = app;
