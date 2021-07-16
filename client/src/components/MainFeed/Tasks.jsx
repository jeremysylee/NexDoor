import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Task from './Task';

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

const Tasks = () => {
  const tasks = useSelector((store) => store.tasksReducer.tasks);
  const userId = useSelector((store) => store.currentUserReducer.userId);

  return (
    <div>
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
      {tasks.map((task) => {
        if (task.status === 'Open' && task.requester.user_id !== userId) {
          return (<Task task={task} key={task.task_id} />);
        }
        return <span key={task.task_id} />;
      })}
    </div>
  );
};

export default Tasks;

// {tasks.map((task) => {
//   if (task.requester.user_id !== userId || task.helper.user_id !== userId) {
//     return (<Task task={task} key={task.task_id} />);
//   }
//   return <></>;
// })};
