import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import axios from 'axios';

import Task from './Task';

const MainFeed = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  // const dispatch = useDispatch();
  const placeholder = 'placeholder';

  // const getTasks = () => {
  //   axios.get('/api/tasks')
  //     .then(({ data }) => {
  //       console.log(data);
  //       dispatch({
  //         type: 'SET_TASKS',
  //         tasks: data,
  //       })
  //         .catch((err) => console.error(err));
  //     });
  // };

  // useEffect(() => {
  //   getTasks();
  // }, []);

  return (
    <div>
      <h1>{placeholder}</h1>
      {tasks.map((task) => (<Task task={task || {}} key={task.task_id} />))}
    </div>
  );
};

export default MainFeed;
