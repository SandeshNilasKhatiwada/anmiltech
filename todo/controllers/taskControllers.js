const taskService = require('../services/taskServices');
const asyncWrapper = require('../utils/asyncWrapper');

const createTask = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const task = await taskService.createTask(name);
  res.status(201).json({ message: 'Task created successfully', task });
});

const addSubtask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { name } = req.body;
  const task = await taskService.addSubtask(taskId, { name });
  res.status(200).json({ message: 'Subtask added successfully', task });
});

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await taskService.getTasks(req.query);
  res.status(200).json({ tasks });
});

const updateSubtaskStatus = asyncWrapper(async (req, res) => {
  const { taskId, subtaskId } = req.params;
  const { completed } = req.body;
  const task = await taskService.updateSubtaskStatus(
    taskId,
    subtaskId,
    completed,
  );
  res.status(200).json({ message: 'Subtask updated successfully', task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await taskService.deleteTask(taskId);
  res.status(200).json({ message: 'Task deleted successfully', task });
});

module.exports = {
  createTask,
  addSubtask,
  getTasks,
  updateSubtaskStatus,
  deleteTask,
};
