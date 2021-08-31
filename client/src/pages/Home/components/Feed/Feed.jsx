import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  MakeARequestTile, OpenTaskTile, MyRequestTile, MyTaskTile,
} from './tiles';
import {
  SectionCard,
  SectionLine,
} from './styles-MainFeed';

const MainFeedContainer = styled.div`
  margin: 1em;
  min-width: 520px;
  max-width: 520px;
`;

const MainFeed = () => {
  const myTasks = useSelector((store) => store.myTasksReducer.myTasks) || [];
  const myRequests = useSelector((store) => store.myRequestsReducer.myRequests) || [];
  const openTasks = useSelector((store) => store.tasksReducer.tasks) || [];
  const page = useSelector((store) => store.currentPageReducer.page);

  return (
    <MainFeedContainer>
      <MakeARequestTile />
      {page === '/myrequests' || page === '/' ? (
        <>
          <SectionCard>People Helping Me</SectionCard>
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
          <SectionCard>Others Requesting Help</SectionCard>
          {openTasks.map((task) => (
            <OpenTaskTile task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
    </MainFeedContainer>
  );
};

export default MainFeed;
