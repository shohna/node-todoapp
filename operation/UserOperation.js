const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserOperation {
  constructor() {}

  // register the user
  async registerUser(user) {
    // register the user
    try {
      let anyUser = await UserModel.findOne({ email: user.email });
      if (anyUser) {
        //email already resgister
        throw new Error(already_reg_user);
      } else {
        let newUser = new UserModel({
          email: user.email,
          password: user.password,
          name: user.name,
        });
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(user.password, salt);
        await newUser.save();
        return { name: user.name, email: user.email };
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // login user
  async checkLogin(email, password) {
    // check fetch user with email and password
    // return success(200)else return error (401);
    try {
      // if the user the email is present
      // then will check the password
      let user = await UserModel.findOne({ email: email });
      if (!user) {
        return { isVerified: false, error: "Username not present" };
      }
      //checking the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return { isVerified: true, data: user };
      }
      return { isVerified: false, error: "invalid credentials" };
    } catch (error) {
      throw new Error("Username or password invalid");
    }
  }
}

module.exports = UserOperation;
