const Planner = require('../models/planner');

exports.addTask = async (req, res) => {
    try {
      console.log(req.body)
      const {
        userId,
        taskDate,
        name,
        startTime,
        endTime,
        location,
        tags,
        highPriority,
        color,
      } = req.body;
  
      // Validate required fields
      if (!userId || !taskDate || !name || !startTime || !endTime) {
        return res.status(400).json({ error: "Required fields are missing." });
      }
  
      // Check if endTime is after startTime
      if (new Date(endTime) <= new Date(startTime)) {
        return res
          .status(400)
          .json({ error: "End time must be later than start time." });
      }
  
      // Create and save the task
      const newTask = await Planner.create({
        userId,
        taskDate,
        name,
        startTime,
        endTime,
        location,
        tags: tags?.split(",").map(tag => tag.trim()), // Split tags by commas and trim spaces
        highPriority,
        color,
      });
  
      return res.status(201).json({ message: "Task added successfully!", task: newTask });
    } catch (error) {
      console.error("Error adding task:", error);
      return res.status(500).json({ error: "An error occurred while adding the task." });
    }
  };
  exports.getTasks = async (req, res) => {
    try {
      console.log("getting the tasks from the back");
      const { userId, taskDate } = req.query;
      console.log("the query is" + req.query)
  
      if (!userId || !taskDate) {
        return res.status(400).json({ message: "User ID and task date are required." });
      }
  
      const taskDateObj = new Date(taskDate);  // Convert taskDate to a Date object
      console.log(taskDateObj)
      // Set the time to 00:00:00 (midnight) for the start of the day
      const startOfDay = new Date(taskDateObj.setHours(0, 0, 0, 0));
      
      // Set the time to 23:59:59 (end of the day) for the end of the day
      const endOfDay = new Date(taskDateObj.setHours(23, 59, 59, 999));
  
      // Query the database for tasks on the given date, regardless of time
      const tasks = await Planner.find({
        userId: userId,
        taskDate: { $gte: startOfDay, $lte: endOfDay }
      });
  
      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found for this date." });
      }
  
      // Return the found tasks
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch tasks. Please try again." });
    }
  };
  exports.updateTask = async (req, res) => {
    try {
      console.log(req.body);
      const {
        taskId,
        userId,
        taskDate,
        name,
        startTime,
        endTime,
        location,
        tags,
        highPriority,
        color,
      } = req.body;
  
      // Validate required fields
      if (!taskId || !userId || !taskDate || !name || !startTime || !endTime) {
        return res.status(400).json({ error: "Required fields are missing." });
      }
  
      // Check if endTime is after startTime
      if (new Date(endTime) <= new Date(startTime)) {
        return res.status(400).json({ error: "End time must be later than start time." });
      }
  
      // Find the task to update by taskId
      const taskToUpdate = await Planner.findOne({ _id: taskId, userId: userId });
      
      if (!taskToUpdate) {
        return res.status(404).json({ error: "Task not found." });
      }
  
      // Update the task with new data
      taskToUpdate.name = name;
      taskToUpdate.taskDate = taskDate; // no need to update the date 
      taskToUpdate.startTime = startTime;
      taskToUpdate.endTime = endTime;
      taskToUpdate.location = location;
      taskToUpdate.tags = tags ? tags.split(",").map(tag => tag.trim()) : taskToUpdate.tags;
      taskToUpdate.highPriority = highPriority;
      taskToUpdate.color = color;
  
      // Save the updated task
      const updatedTask = await taskToUpdate.save();
  
      return res.status(200).json({ message: "Task updated successfully!", task: updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ error: "An error occurred while updating the task." });
    }
  };
  exports.deleteTask = async (req, res) => {
    const { taskId } = req.body;
  
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required." });
    }
  
    try {
      await Planner.findByIdAndDelete(taskId); 
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task. Please try again." });
    }
  };
  
  