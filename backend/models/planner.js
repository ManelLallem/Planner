const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plannerUser",
    required: true,
  },
  taskDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: String, 
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  tags: {
    type: [String], 
    default:[],
  },
  highPriority: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "#4285f4",
  },
});

const Planner = mongoose.model("Planner", plannerSchema); 

module.exports = Planner; // Export only Planner, not as an object
