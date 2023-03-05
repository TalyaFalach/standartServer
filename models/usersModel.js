const mongoose = require("mongoose");

//we created a schema to specift our data, and make a basic validation
const userScema = new mongoose.Schema({
  fname: {
    required: [true, "First name is required"],
    type: String,
    trim: true,
  },
  lname: {
    required: [true, "Last name is required"],
    type: String,
    trim: true,
  },
  email: {
    required: [true, "Email is required"],
    type: String,
    trim: true,
    unique: true,
  },
  birthDate: {
    required: [true, "birth date is required"],
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  confirnPassword: {
    type: String,
    required: [true, "password is required"],
  },
});

//creating the model
const User = mongoose.model("User", userScema);

//export the model
module.exports = User;
