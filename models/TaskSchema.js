const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["inprogress", "completed", "not_started"],
    default: "not_started",
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("task", TaskSchema);
