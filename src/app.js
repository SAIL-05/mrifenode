const express = require("express");
const bookRouter = require("./routes/books.routes");
const categoryRouter = require("./routes/category.routes");
const userRouter = require("./routes/user.routes");

const appRouter = express.Router();

appRouter.use("/books", bookRouter);
appRouter.use("/categories", categoryRouter);
appRouter.use("/users", userRouter);

module.exports = appRouter;
