import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import axios from 'axios';

import Task from './Task';

const MainFeed = () => {
  // const [ratingModal, setRatingModal] = useState(false);
  // const [requestModal, setRequestModal] = useState(false);
  const tasks = useSelector((store) => store.tasksReducer.tasks);

  const placeholder = 'placeholder';

  return (
    <div>
      <h1>{placeholder}</h1>
      {tasks.map((task) => (<Task task={task || {}} key={task.task_id} />))}
    </div>
  );
};

export default MainFeed;
