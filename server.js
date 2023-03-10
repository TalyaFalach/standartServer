// everything that is related to the expresss or server is here
// enviroment variables, db connections
const mongoose = require("mongoose");
const morgan = require("morgan");

process.on("uncaughtExceptions", (err) => {
  console.log("uncaughtExceptions");
  console.log(err.name, err.message);
  process.exit(1);
});



const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_LOCAL;

app.use(cors());

//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("connectod to DB"))
  .catch((err) => console.log("err", err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

