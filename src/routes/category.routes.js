const express = require("express");
const {
  addNewCategory,
  fetchAllCategories,
} = require("../controllers/category.controllers");

const categoryRouter = express.Router();

categoryRouter.route("/").post(addNewCategory).get(fetchAllCategories);

module.exports = categoryRouter;
