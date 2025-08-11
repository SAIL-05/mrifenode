const Categories = require("../models/category.model");

const addNewCategory = (req, res) => {
  try {
    let newCategory = new Categories({
      name: req.body.name,
    });
    newCategory.save();
    res.send("Category saved successfully");
  } catch (err) {
    res.send("An error has occurred");
  }
};

const fetchAllCategories = async (req, res) => {
  try {
    let allCategories = await Categories.find({});
    res.json({
      data: allCategories,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addNewCategory,
  fetchAllCategories,
};
