const AppError = require("./../utils/appError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path} is ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.massage);
  message = `Invalid Input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicatedFields = (err) => {
  const message = `Duplicated field value, please use another value`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
// const handleJWTError = (err) => new AppError("invalid token. log in again");
// const handleJWTExpiredToken = (err) =>
//   new AppError("your token has expired. log in again");

// module.exports = (err, req, res, next) => {
//   //  if(err.name)
// };

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicatedFields(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
