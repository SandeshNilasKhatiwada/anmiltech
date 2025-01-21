import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTasks = (search = '') =>
  axios.get(`${API_URL}/tasks?search=${search}`);

export const createTask = (task) => axios.post(`${API_URL}/tasks`, task);

export const deleteTask = (taskId) =>
  axios.delete(`${API_URL}/tasks/${taskId}`);

export const addSubtask = (taskId, subtask) =>
  axios.post(`${API_URL}/tasks/${taskId}/subtasks`, subtask);

export const updateSubtaskStatus = (taskId, subtaskId, completed) =>
  axios.patch(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`, {
    completed,
  });

export const deleteSubtask = (taskId, subtaskId) =>
  axios.delete(`${API_URL}/tasks/${taskId}/subtasks/${subtaskId}`);
