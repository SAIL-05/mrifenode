const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    // let url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yrxma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

    let url = `mongodb://localhost:27017/${process.env.DB_NAME}`;
    await mongoose.connect(url);
    console.log("App connected to database");
  } catch (err) {
    console.log("An error occurred while connecting", err);
  }
};

module.exports = connectToDb;
