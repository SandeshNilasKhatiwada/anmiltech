import React, { useState, useEffect } from 'react';
import {
  fetchTasks,
  createTask,
  deleteTask,
  addSubtask,
  updateSubtaskStatus,
  deleteSubtask,
} from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks(search);
      setTasks(data.tasks);
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search]);

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      toast.success('Task added successfully');
      loadTasks();
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success('Task deleted successfully');
      loadTasks();
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const handleAddSubtask = async (taskId, subtask) => {
    try {
      await addSubtask(taskId, subtask);
      toast.success('Subtask added successfully');
      loadTasks();
    } catch (error) {
      toast.error('Error adding subtask');
    }
  };

  const handleUpdateSubtaskStatus = async (taskId, subtaskId, completed) => {
    try {
      await updateSubtaskStatus(taskId, subtaskId, completed);
      toast.success('Subtask status updated');
      loadTasks();
    } catch (error) {
      toast.error('Error updating subtask status');
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      await deleteSubtask(taskId, subtaskId);
      toast.success('Subtask deleted successfully');
      loadTasks();
    } catch (error) {
      toast.error('Error deleting subtask');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-5'>
      <ToastContainer />
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-4'>To-Do List</h1>
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search tasks'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onAddSubtask={handleAddSubtask}
          onUpdateSubtaskStatus={handleUpdateSubtaskStatus}
          onDeleteSubtask={handleDeleteSubtask}
        />
      </div>
    </div>
  );
};

export default App;
