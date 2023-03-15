const User = require("./../models/usersModel");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

//create a token
const signToken = (id) => {
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    //the data that we want to put in our jwt - the new user _id
    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); //take the field that we need

    //if it is NOT true
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("incorrect email or password", 400));
    }
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      token,
      status: "success1",
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      userId: id,
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: "invalid email or password",
    });
  }
};

// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   // 1) Getting token and check if it's there

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   //console.log(token);

//   if (!token) {
//     return next(
//       new AppError("You are not logged in. please log in to get access", 401)
//     );
//   }
//   // 2) Varification token
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   console.log(decoded);

//   // 3) Check if user still exists
//   //? find the user by id, with the decoded id
//   const user = await User.findById(decoded.id);
//   if (!user) {
//     next(new AppError("The token is no longer exist", 401));
//   }

  
//   next();
// });
