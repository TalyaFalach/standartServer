const User = require("./../models/usersModel");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
     res.status(200).json({
       status: "failed",
       message:'something not working'
     });
  }
};
