const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//* we created a schema to specift our data, and make a basic validation
const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "First name is required"],
    type: String,
    trim: true,
  },
  lastName: {
    required: [true, "Last name is required"],
    type: String,
    trim: true,
  },
  email: {
    required: [true, "Email not valid, please check your email address"],
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail],
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
    required: [true, "please provide a password"],
    minlength: 8,
    select: false, //the password will not appear at the get all or any get request
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      // this only works on SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
});

// pre save missleware will run, between getting the data and saving it to the database
userSchema.pre("save", async function (next) {
  //only run this function if password was modified
  if (!this.isModified("password")) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete the confirm password field
  this.confirmPassword = undefined;
  next();
});

//hashedPassword      userpassword
//! this is an instance function - it is available in ALL documents and we can use her
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

//export the model
module.exports = User;
