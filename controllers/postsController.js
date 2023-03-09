
const Post = require("./../models/postsModel");

exports.getPostById = async (req,res) => {
  try {
    const posts = await Post.find({userId: req.params.id} );
    res.status(200).json({
      status: "success",
      data: {
        posts: posts,
      },
    })
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message:err
    });
  }
};


