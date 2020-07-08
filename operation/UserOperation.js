const UserModel = require("../models/User");
const connectDb = require("../config/db");
connectDb();

class UserOperation {
  constructor() {}

  async registerUser(user) {
    user = { name: "shohna", email: "shohna@gmail.com", password: "password" };
    try {
      let anyUser = await UserModel.findOne({ email: user.email });
      if (anyUser) {
        throw new Error("The mentioned email is already registered");
      } else {
        let newUser = new UserModel({
          email: user.email,
          password: user.password,
          name: user.name,
        });

        await newUser.save();
        return { name: user.name, email: user.email };
      }
    } catch (error) {
      throw new Error("There was an error while registering");
    }
  }
  async checkLogin(email, password) {
    try {
      let user = await UserModel.findOne({ email: email, password: password });
      if (!user) {
        throw new Error("Username or password invalid");
      } else {
        return user;
      }
    } catch (error) {
      throw new Error("Username or password invalid");
    }
  }
}

(async () => {
  await connectDb();
  let Operation = new UserOperation();
  //   let data = await Operation.registerUser({});
  let data = await Operation.checkLogin("shohna@gmail.com", "password");
  console.log(data);
})();

module.exports = UserOperation;
