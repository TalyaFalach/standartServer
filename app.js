
const express = require("express");
const usersRouter = require("./routes/usersRoutes");
const morgan = require("morgan");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())




app.use("/users", usersRouter);

module.exports = app;
