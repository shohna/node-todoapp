const express = require("express");
const router = express.Router();
const TaskOperation = require("../operation/TaskOperation");

router.get("/list/:page", async (req, res) => {
  try {
    const { page } = req.params;
    let operation = new TaskOperation();
    let taskList = await operation.getPaginationTaskList(page, 2);
    res.status(200).json({
      success: true,
      task: taskList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
  console.log("We are in the router module");
  res.json({ data: "this is a data" });
});

module.exports = router;
