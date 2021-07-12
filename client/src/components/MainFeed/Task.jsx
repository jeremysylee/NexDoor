import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const Task = ({ task }) => {
  const placeholder = 'Task placeholder';

  const timeDifference = () => {
    const end = DateTime.fromISO(task.date);
    const start = DateTime.local();
    const time = DateTime.fromISO(task.time);
    const diff = end.diff(start, ['months', 'days', 'hours', 'minutes', 'seconds']);
    console.log(diff);
    console.log('start', time);
  };

  timeDifference();
  console.log(task);

  return (
    <div>
      <img
        src={task.user.profile_picture}
        alt="profilePhoto"
        style={{
          height: '32px', width: '32px', objectFit: 'cover', borderRadius: '100%',
        }}
      />
      {task.user.firstname}
      {task.user.lastname}
      {task.description}
      {task.duration}
      {task.time}
      {task.car_required}
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
    }),
    description: PropTypes.string.isRequired,
    duration: PropTypes.string,
    time: PropTypes.string,
    car_required: PropTypes.bool,
  }).isRequired,
};

export default Task;
