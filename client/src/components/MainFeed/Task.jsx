import React from 'react';

const Task = ({ task }) => {
  const placeholder = 'Task placeholder';

  return (
    <div>
      {task.description}
    </div>
  );
};

export default Task;
