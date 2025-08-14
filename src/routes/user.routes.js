const express = require("express");
const {
  signUserUp,
  signUserIn,
  lendBook,
} = require("../controllers/user.controllers");
const authValidator = require("../middlewares/authValidator");
// const {
//   addNewCategory,
//   fetchAllCategories,
// } = require("../controllers/category.controllers");

const userRouter = express.Router();

userRouter.route("/").post(signUserUp);

userRouter.post("/signin", signUserIn);

userRouter.post("/lendbook", authValidator, lendBook);

module.exports = userRouter;
