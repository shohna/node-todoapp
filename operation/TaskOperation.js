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
  async updateTask(task) {
    try {
      const taskDb = await this.TaskModel.findById(task.id);
      if (!taskDb) {
        console.log("Record not present");
        return { isUpdated: false, error: "Record not present" };
      }
      const data = await this.TaskModel.findByIdAndUpdate(
        task.id,
        { $set: task },
        { new: true }
      );
      console.log(data, task.id);
      return { isUpdated: true, id: data };
    } catch (error) {
      console.log("Error while updating document", error);
      throw new Error("Error while updating the data");
    }
  }

  async removeTask(id) {
    try {
      const task = await this.TaskModel.findById(id);
      if (!task) {
        console.log("Record not present");
        return { isDeleted: false, error: "Record not present" };
      }
      const data = await this.TaskModel.findByIdAndRemove(id);
      console.log(data, id);
      return { isDeleted: true, id: id };
    } catch (error) {
      console.log("Error while deleting document", error);
      throw new Error("Error while deleting the data");
    }
  }
}

// (async () => {
//   await connectDb();
//   let operation = new TaskOperation();
//   //
//   let task = {
//     id: "5f06a30790e33b3f10372469",
//     status: "inprogress",
//   };
//   let data = await operation.updateTask(task);
//   console.log("This is the data", data);
// })();

module.exports = TaskOperation;
