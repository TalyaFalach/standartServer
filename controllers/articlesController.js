const Articles = require("./../models/articlesModel");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find();
    res.status(201).json({
      status: "success",

      data: articles,
    });
  } catch (err) {
    res.status(201).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getAllUserArticles = async (req, res) => {
  try {
    const articles = await Articles.find({ userId: req.params.id });
    res.status(201).json({
      status: "success",

      data: articles,
    });
  } catch (err) {
    res.status(201).json({
      status: "failed",
      message: err,
    });
  }
};
exports.createArticle = async (req, res) => {
  try {
    await Articles.create(req.body);
    res.status(201).json({
      status: "success",
      message: "your post has been created",
    });
  } catch (err) {
    res.status(201).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const article = await Articles.findByIdAndDelete(req.params.id);
  if (!article) {
    return next(new AppError("this article is not exist", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "deleted",
    },
  });
});

exports.updateArticle = async (req, res) => {
  try {
    await Articles.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: "updated",
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
    });
  }
};
