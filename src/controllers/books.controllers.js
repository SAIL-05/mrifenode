const Books = require("../models/books.model");

//METHOD 3
const getAllBooks = async (req, res) => {
  try {
    let allBooks = await Books.find().populate("category");
    res.status(200).json({
      data: allBooks,
    });
  } catch (err) {
    res.send("An error occurred");
  }
};

const findOneBook = async (req, res) => {
  try {
    let allBooks = await Books.find({
      _id: req.params.id,
    }).populate("category");
    res.status(200).json({
      data: allBooks,
    });
  } catch (err) {
    res.send("An error occurred");
  }
};

const addNewBook = (req, res) => {
  const { title, author, quantity, category } = req.body;

  try {
    let newBook = new Books({
      title,
      author,
      quantity,
      category,
    });

    // newBook.title = 'djfldfj'
    newBook.save();
    res.status(200).json({
      data: newBook,
      message: "All books have been added",
    });
  } catch (err) {
    res.send("An error occurred while adding data");
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  findOneBook,
};
