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
const handleJWTError = (err)=> new AppError("Invalid token, please login again",401)
const handleJWTExpiredError = (err)=> new AppError("Youre token, has expired",401)

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
      if(error.name === "jsonWebTokenError") error = handleJWTError(error)
      if(error.name ==="tokenExpiredError") error = handleJWTExpiredError(error)

    sendErrorProd(error, res);
  }
};
