const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  numberOfPages: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Books = mongoose.model("Book", BookSchema);

module.exports = Books;
