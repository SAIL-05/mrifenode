const User = require("../models/users.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log(userDetails);
    if (userDetails) {
      let checkPassword = await bcrypt.compare(password, userDetails.password);
      if (checkPassword) {
        let userToken = jwt.sign(
          {
            _id: userDetails._id,
          },
          "nfbdibfidbfdfbd"
        );
        console.log(userToken);
        res.send("Welcome home");
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

module.exports = {
  signUserUp,
  signUserIn,
};
