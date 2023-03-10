const express = require("express");
const usersRouter = require("./routes/usersRoutes");
const morgan = require("morgan");
const globalErrorHandler = require("./controllers/errorController");
const appError = require("./utils/appError");
const postsRouter = require("./routes/postsRoute");
const cors = require("cors");
const AppError = require("./utils/appError");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers.authorization.split(' ')[1]);
  
  next();
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
