const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  city: {
    type: String,
  },

  userId: {
    type: String,
    required: [true, "we need tour details"],
  },
  productName: {
    type: String,
    required: [true, "Product name is required"],
    minlength: 1,
  },
  price: {
    type: String,
    required: [true, "Please enter price"],
  },
  photo: {
    type: String,

    default: "",
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  contact: {
    type: String,
    minlength: 7,
  },
  description: {
    type: String,
    required: [true, "please tell about your product"],
    minlength: 5,
  },

  comments: [String],
  likes: [String],
});

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
