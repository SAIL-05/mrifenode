const express = require("express");
const {
  getAllBooks,
  addNewBook,
  findOneBook,
} = require("../controllers/books.controllers");

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks).post(addNewBook);

bookRouter.get("/edit-profile-picture", getAllBooks);

bookRouter.get("/:id", findOneBook);

bookRouter.post("/edit-profile-picture", getAllBooks);

bookRouter.post("/edit-profile-picture", (req, res) => {});

bookRouter.route("/edit-profile-picture").get(getAllBooks).post(getAllBooks);

module.exports = bookRouter;
