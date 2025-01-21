import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const TaskList = ({
  tasks,
  onDeleteTask,
  onAddSubtask,
  onUpdateSubtaskStatus,
  onDeleteSubtask,
}) => {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = (taskId) => {
    if (!newSubtask.trim()) return;
    onAddSubtask(taskId, { name: newSubtask });
    setNewSubtask('');
  };

  return (
    <div>
      {tasks.map((task) => (
        <Disclosure key={task._id}>
          {({ open }) => (
            <div
              className={`p-4 mb-4 border rounded-md ${
                task.completed ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <div className='flex justify-between items-center'>
                <Disclosure.Button className='flex items-center text-lg font-semibold'>
                  {task.name}
                  {open ? (
                    <ChevronUpIcon className='w-5 h-5 ml-2' />
                  ) : (
                    <ChevronDownIcon className='w-5 h-5 ml-2' />
                  )}
                </Disclosure.Button>
                <button
                  onClick={() => onDeleteTask(task._id)}
                  className='text-red-500 hover:underline'
                >
                  Delete Task
                </button>
              </div>

              <Disclosure.Panel>
                <ul className='mt-4 space-y-2'>
                  {task.subtasks.map((subtask) => (
                    <li
                      key={subtask._id}
                      className='flex justify-between items-center'
                    >
                      <div>
                        <input
                          type='checkbox'
                          checked={subtask.completed}
                          onChange={(e) =>
                            onUpdateSubtaskStatus(
                              task._id,
                              subtask._id,
                              e.target.checked,
                            )
                          }
                          className='mr-2'
                        />
                        <span
                          className={`${
                            subtask.completed
                              ? 'line-through text-gray-500'
                              : ''
                          }`}
                        >
                          {subtask.name}
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteSubtask(task._id, subtask._id)}
                        className='text-red-500 hover:underline'
                      >
                        Delete Subtask
                      </button>
                    </li>
                  ))}
                </ul>
                <div className='mt-4 flex gap-2'>
                  <input
                    type='text'
                    placeholder='Add a subtask'
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    className='p-2 border border-gray-300 rounded-md flex-grow'
                  />
                  <button
                    onClick={() => handleAddSubtask(task._id)}
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
                  >
                    Add Subtask
                  </button>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default TaskList;
