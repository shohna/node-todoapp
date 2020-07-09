const connectDb = require("../config/db");
class TaskOperation {
  constructor() {
    this.TaskModel = require("../models/TaskSchema");
  }

  async getPaginationTaskList(current_page, limit = 10) {
    try {
      let skip_count = (current_page - 1) * limit;
      const taskList = await this.TaskModel.find()
        .skip(skip_count)
        .limit(limit);
      return taskList;
    } catch (error) {
      console.log("There was an error while fetching task", error);
      throw new Error("Error while fetching data");
    }
  }
  async insertTask(title, status) {
    try {
      const taskDb = await new this.TaskModel({
        title: title,
        status: status,
      });
      return await taskDb.save();
    } catch (error) {
      console.log("There was an error while inserting the data", error);
      throw new Error("Error while inserting the data");
    }
  }
  updateTask(task) {}
  removeTask(task) {}
}

(async () => {
  await connectDb();
  let operation = new TaskOperation();
  //   let data = await operation.insertTask("This has been inserted", "inprogress");
  //   data = await operation.insertTask(
  //     "Performing get operation for task",
  //     "inprogress"
  //   );
  //   data = await operation.insertTask("Expose this as an API", "not_started");
  let data = await operation.getPaginationTaskList(2, 2);
  console.log(data);
})();
