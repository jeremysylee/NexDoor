import React from 'react';
import PropTypes from 'prop-types';


const Task = ({ task }) => {
  const placeholder = 'Task placeholder';

  console.log(task);

  return (
    <div>
      <img
        src={task.user.profile_picture}
        alt='profilePhoto'
        style={{
          height: '32px', width: '32px', objectFit: 'cover', borderRadius: '100%',
        }}
      />
      {task.user.firstname}
      {task.user.lastname}
      {task.description}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.element.isRequired,
};

export default Task;
