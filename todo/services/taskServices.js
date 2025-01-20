const Task = require('../models/Tasks');

const createTask = async (name) => {
  return await Task.create({ name });
};

const addSubtask = async (taskId, subtask) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error('Task not found');
  task.subtasks.push(subtask);
  await task.save();
  return task;
};

const getTasks = async (query) => {
  const search = query?.search
    ? { name: { $regex: query.search, $options: 'i' } }
    : {};
  return await Task.find(search);
};

const updateSubtaskStatus = async (taskId, subtaskId, completed) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error('Task not found');
  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) throw new Error('Subtask not found');
  subtask.completed = completed;
  task.completed = task.subtasks.every((st) => st.completed);
  await task.save();
  return task;
};

const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) throw new Error('Task not found');
  return task;
};

module.exports = {
  createTask,
  addSubtask,
  getTasks,
  updateSubtaskStatus,
  deleteTask,
};
