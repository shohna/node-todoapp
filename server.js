const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const connectDb = require("./config/db");

connectDb();

app.use("/api/task", require("./routes/task"));

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("There was an error listening to port", PORT);
  } else {
    console.log("Application running on port", PORT);
  }
});
