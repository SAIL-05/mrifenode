const express = require("express");
const { signUserUp, signUserIn } = require("../controllers/user.controllers");
// const {
//   addNewCategory,
//   fetchAllCategories,
// } = require("../controllers/category.controllers");

const userRouter = express.Router();

userRouter.route("/").post(signUserUp);

userRouter.post("/signin", signUserIn);

module.exports = userRouter;
