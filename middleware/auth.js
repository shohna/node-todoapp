const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

module.exports = function (req, res, next) {
  // get the the token from the header (x-auth-header)
  const token = req.header("x-auth-token");
  // let check if the token is present
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "No token, authorization denied" });
  }

  try {
    // we will decode the token
    const decode = jwt.verify(token, config.jsonwebtokenPassword);
    req.user_id = decode.user_id;
    // if not errror while decoding the function move to next handler using next()
    next();
  } catch (error) {
    console.log(error);
    // if there is an error : unauth 401 using invalid token
    return res
      .status(401)
      .json({ success: false, error: "No token, authorization denied" });
  }
};
