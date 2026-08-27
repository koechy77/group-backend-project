require("dotenv").config();

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === "development") {
    // give me the full error
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // production
  if (err.isOperational) {
    // Known/application error
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // unknown/technical error
  return res.status(500).json({
    status: error,
    message: "something went wrong",
  });
};
module.exports = errorHandler;
