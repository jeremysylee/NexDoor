import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  CardHeaders,
} from './style';

import MyTask from './MyTask';

const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
  padding: 1em;
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
