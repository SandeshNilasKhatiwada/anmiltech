const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subtasks: [SubtaskSchema],
});

module.exports = mongoose.model('Task', TaskSchema);
