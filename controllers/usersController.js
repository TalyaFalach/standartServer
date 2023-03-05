//! this file has all the handlers (functions)

//import userModel
const User = require("./../models/usersModel");

//*console.log(users);

//get all
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    return res.status(200).json({
      status: "success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

//get by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

//post
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: { user: newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

//patch
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //the first document will update
    });
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "User not found",
    });
  }
};
//delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "User not found",
    });
  }
};
