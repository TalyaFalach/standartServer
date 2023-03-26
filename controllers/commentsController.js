const Comments = require("../models/commentsModel");

exports.addComment = async (req, res) => {
  try {
    const comment = req.body;
    await Comments.create(comment);
    res.status(201).json({
      status: "success",
      message: "Amit the king!",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "try again!",
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.id });
    res.status(201).json({
      status: "success",
      data: comments,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
    });
  }
};
