const mongoose = require("mongoose");


const postsSchema = new mongoose.Schema({
  userId: {
    required: [true, "user id is required"],
    type: String,
    trim: true,
  },
  post: {
    required: [true, "Last name is required"],
    type: String,
    minlength: 1,
  },
  image:{
    type:String,
    default:""
  }
});




const Post = mongoose.model("Post", postsSchema);

//export the model
module.exports = Post;
