import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Task from './Task';
import MyRequests from './MyRequests';
import MyTasks from './MyTasks';

const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
  padding: 1em;
`;

const Tasks = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);

  return (
    <div style={{ margin: '1em', maxWidth: '33%' }}>
      <MyRequests />
      <MyTasks />
      <Card>
        <div style={{
          fontFamily: 'Roboto',
          fontSize: '18px',
          fontWeight: '400',
        }}
        >
          Others Requesting Help
        </div>
      </Card>
      {tasks.map((task) => (<Task task={task} key={task.task_id} />))}
    </div>
  );
};

export default Tasks;
