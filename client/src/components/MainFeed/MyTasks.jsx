import React from 'react';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import styled from 'styled-components';
import {
  CardHeaders,
} from './styles-MainFeed';

import MyTask from './MyTask';

// const url = 'http://localhost:3500';

const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
  padding: 1em;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
`;

const MyTasks = () => {
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks);

  return (
    <div>
      <Card>
        <CardHeaders>People I Am Helping</CardHeaders>
      </Card>
      {myTasks.map((task) => (
        <MyTask task={task} key={task.task_id} />
      ))}
    </div>
  );
};

export default MyTasks;
