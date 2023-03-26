const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
  },

  userFirstName: {
    type: String,
    required: [true, "Enter First Name"],
  },
  userLastName: {
    type: String,
    required: [true, "Enter Last Name"],
  },

  userImage: {
    type: String,
    required: [true, "you must enter a user image"],
  },

  comment: {
    type: String,
    minlength: 1,
    required: true,
  },

  postId: {
    required: true,
    type: String,
  },

  date: String,
});

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
