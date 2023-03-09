//! this file has all the handlers (functions)

//import userModel
const AppError = require("../utils/appError");
const User = require("./../models/usersModel");
const catchAsync = require("./../utils/catchAsync");

//get all
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users: users,
    },
  });
});

//get by id
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("This user is not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: user,
    },
  });
});

//post
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    message: { user: newUser },
  });
});

//patch
exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //the first document will update
  });

  if (!updatedUser) {
    return next(new AppError("This user is not exist", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
//delete
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("This user is not exist", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: null,
    },
  });
});
