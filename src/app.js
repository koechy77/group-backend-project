const express = require("express");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const morgan = require("morgan");
const errorHandler = require("../utils/middleware/errorHandler");

const app = express();

app.set("query parser", "extended");

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
app.use("/api/v1/products", productRouter);
app.use("/api/v1/:productId/reviews", reviewRouter);

// Error-handling middleware
app.use(errorHandler);

module.exports = app;
