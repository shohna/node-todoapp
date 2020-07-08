const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/test?retryWrites=true&w=majority";

const connectDb = async () => {
  await mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log("mongodb connected");
};

module.exports = connectDb;
