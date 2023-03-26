const mongoose = require("mongoose");
const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a title to your article"],
  },
  text: {
    type: String,
    required: [true, "you must add text"],
  },

  category:String,
  image:String,

  userId: {
    type: String,
    trim: true,
    required: true,
  },
  date:String,

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
   
  },
});

const Articles = mongoose.model("Articles", articlesSchema);
module.exports = Articles;
