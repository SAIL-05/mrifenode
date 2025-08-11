const express = require("express");
const connectToDb = require("./src/config/db");
const dotenv = require("dotenv");
const appRouter = require("./src/app");

dotenv.config();

const app = express();

app.use(express.json());

connectToDb();

app.use("/api/v1", appRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("App listening on port", port));
