const mongoose = require("mongoose");
const config = require("./config");
const dbURL = config.mongodbUrl;

const connectDb = async () => {
  await mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log("mongodb connected");
};

module.exports = connectDb;
