const jwt = require("jsonwebtoken");
const apiResponse = require("../utils/apiResponse");
const User = require("../models/users.model");

const authValidator = async (req, res, next) => {
  console.log(req.headers);
  let reqHeader = req.headers.authorization;
  if (!reqHeader || !reqHeader.startsWith("Bearer ")) {
    apiResponse(
      res,
      "Only logged in users can access this route",
      401,
      false,
      null,
      {
        message: "Please login to access route",
      }
    );
  } else {
    try {
      const token = reqHeader.split(" ")[1];
      const tokenDetails = jwt.verify(token, "nfbdibfidbfdfbd");
      let userDetail = await User.findById(tokenDetails._id);
      if (userDetail) {
        req.user = userDetail;
        next();
      } else {
        apiResponse(res, "User does not exist", 401, false, null, {
          message: "User does not exist",
        });
      }
    } catch (err) {
      apiResponse(res, "Token is invalid", 401, false, null, {
        message: "Token is invalid",
      });
    }
  }
  //   console.log("I can do what I want");
  //   console.log("this is today's date", new Date());
  //   console.log("Only logged in users can access this route");
  //   console.log(req.body);
  //   next();
};

module.exports = authValidator;
