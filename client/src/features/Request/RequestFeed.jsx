import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  OpenTaskTile, MyRequestTile, MyTaskTile,
} from './RequestTile';
import MakeRequestInput from './components/MakeRequestInput';
import {
  SectionCard,
  SectionLine,
} from './RequestFeed.styles';

const MainFeedContainer = styled.div`
  margin: 1em;
  min-width: 520px;
  max-width: 520px;
`;

const RequestFeed = () => {
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks) || [];
  const myRequests = useSelector((store) => store.myRequestsReducer.myRequests) || [];
  const openTasks = useSelector((store) => store.tasksReducer.tasks) || [];
  const page = useSelector((store) => store.currentPageReducer.page);

  return (
    <MainFeedContainer>
      <MakeRequestInput />
      {page === '/myrequests' || page === '/' ? (
        <>
          <SectionCard>My Requests</SectionCard>
          {myRequests.map((request) => (
            <MyRequestTile request={request} key={request.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/mytasks' || page === '/' ? (
        <>
          <SectionCard>People I Am Helping</SectionCard>
          {myTasks.map((task) => (
            <MyTaskTile task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/tasks' || page === '/' ? (
        <>
          <SectionCard>Neighbors Requesting Help</SectionCard>
          {openTasks.map((task) => (
            <OpenTaskTile task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
    </MainFeedContainer>
  );
};

export default RequestFeed;
