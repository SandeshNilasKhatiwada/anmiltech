const express = require('express');
const taskController = require('../controllers/taskControllers');

const router = express.Router();

router.post('/tasks', taskController.createTask);
router.post('/tasks/:taskId/subtasks', taskController.addSubtask);
router.get('/tasks', taskController.getTasks);
router.patch(
  '/tasks/:taskId/subtasks/:subtaskId',
  taskController.updateSubtaskStatus,
);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;
