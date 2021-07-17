import React from 'react';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import {
  CardHeaders,
  SectionCard,
} from './styles-MainFeed';

import MyTask from './MyTask';

const MyTasks = () => {
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks);

  return (
    <div>
      <SectionCard>
        <CardHeaders>People I Am Helping</CardHeaders>
      </SectionCard>
      {myTasks.map((task) => (
        <MyTask task={task} key={task.task_id} />
      ))}
    </div>
  );
};

export default MyTasks;
