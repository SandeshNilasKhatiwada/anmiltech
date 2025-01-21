import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    onAddTask({ name: taskName });
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
      <input
        type='text'
        placeholder='Add a new task'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className='p-2 border border-gray-300 rounded-md flex-grow'
        required
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
