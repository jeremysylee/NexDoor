import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

const Tasks = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);

  return (
    <div style={{ margin: '1em' }}>
      <h2>Others Requesting Help</h2>
      <h4>All tasks</h4>
      {tasks.map((task) => (<Task task={task} key={task.task_id} />))}
    </div>
  );
};

export default Tasks;
