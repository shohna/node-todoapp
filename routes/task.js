const express = require("express");
const router = express.Router();
const TaskOperation = require("../operation/TaskOperation");
const { check, validationResult, param } = require("express-validator");
const auth = require("../middleware/auth");

router.get("/list/:page", auth, async (req, res) => {
  try {
    const { page } = req.params;
    let operation = new TaskOperation();
    let taskList = await operation.getPaginationTaskList(page, 10, req.user_id);
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
});

router.post(
  "/",
  auth,
  [check("title").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      let operation = new TaskOperation();

      const { title, status } = req.body;
      let insertedTask = await operation.insertTask(title, status, req.user_id);
      res.status(200).json({
        success: true,
        task: insertedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
);

router.delete(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Please pass a valid ID")],
  async (req, res) => {
    try {
      const { id } = req.params;
      const validationError = validationResult(req);
      if (!validationError) {
        return res
          .status(400)
          .json({ success: false, error: validationError.errors });
      }
      let operation = new TaskOperation();
      let result = await operation.removeTask(id, req.user_id);
      if (!result.isDeleted) {
        return res.status(400).json({ success: false, error: result.error });
      }
      res.status(200).json({
        success: true,
        task: result.id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
);

router.put(
  "/:id",
  auth,
  [param("id").isMongoId().withMessage("Please pass a valid ID")],
  async (req, res) => {
    try {
      // validate the request
      const { id } = req.params;
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        return res
          .status(400)
          .json({ success: false, error: validationError.errors });
      }

      // build our task object
      const { title, status } = req.body;
      const updatedTask = { id: id };

      if (title) updatedTask.title = title;
      // check if the status has one of either value ('not_started,complete,inprogress')
      if (status) updatedTask.status = status;

      let operation = new TaskOperation();
      let result = await operation.updateTask(updatedTask, req.user_id);
      // build result based on result
      if (!result.isUpdated) {
        return res.status(400).json({ success: false, error: result.error });
      }
      res.status(200).json({
        success: true,
        task: result.data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = router;
