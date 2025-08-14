const User = require("../models/users.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Books = require("../models/books.model");
const apiResponse = require("../utils/apiResponse");

const signUserUp = async (req, res) => {
  try {
    let { firstName, lastName, emailAddress, password } = req.body;

    let existingEmail = await User.findOne({
      emailAddress,
    });
    if (existingEmail) {
      res.send("User already exists");
    } else {
      // let newSalt = await bcrypt.genSalt(10);
      // console.log(newSalt);

      let hashedPassword = await bcrypt.hash(password, 12);
      console.log(hashedPassword);

      //   let hashedPassword2 = bcrypt.hashSync(password, 12);
      //   console.log(hashedPassword2 );

      let newUser = new User({
        firstName,
        lastName,
        emailAddress,
        password: hashedPassword,
      });
      newUser.save();
      res.send("A new user has been added");
    }
  } catch (err) {
    console.log(err);
    res.send("An error has occurred while signing user up");
  }
};

const signUserIn = async (req, res) => {
  try {
    let { emailAddress, password } = req.body;
    const userDetails = await User.findOne({
      emailAddress,
    });
    if (userDetails) {
      let checkPassword = await bcrypt.compare(password, userDetails.password);
      if (checkPassword) {
        let userToken = jwt.sign(
          {
            _id: userDetails._id,
          },
          "nfbdibfidbfdfbd"
        );
        apiResponse(res, "Signin successful", 200, true, {
          token: userToken,
        });
      } else {
        res.send("User does not exist");
      }
      console.log(checkPassword);
      //   res.send("You can continue");
    } else {
      res.send("User does not exist");
    }
  } catch (err) {
    console.log(err);
    res.send("An error occurred");
  }
};

const lendBook = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.body.bookId);

    if (!isValidId)
      apiResponse(res, "Book id is not valid", 400, false, null, {
        message: "Book id is not valid",
      });
    const bookData = await Books.findById(req.body.bookId);
    if (bookData) {
      if (bookData.quantity) {
        let updatedBook = await Books.updateOne(
          {
            _id: req.body.bookId,
          },
          {
            quantity: +bookData.quantity - 1,
            $push: {
              user: req.user._id,
            },
          },
          { _new: true }
        );
        //   bookData.quantity = +bookData.quantity - 1;
        //   bookData.user;
        //   bookData.save();
        apiResponse(res, "Book loaned successfully", 200, true, updatedBook);
      } else {
        apiResponse(res, "You can't borrow book for now", 400, false);
      }
    } else {
      apiResponse(res, "Book does not exist", 404, false);
    }
  } catch (err) {
    apiResponse(res, "An error occurred while lending book", 500, false, null, {
      message: err.message,
    });
  }
};

module.exports = {
  signUserUp,
  signUserIn,
  lendBook,
};
