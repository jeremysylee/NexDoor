import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MakeARequest from './MakeARequest';
import OpenTask from './OpenTask';
import MyRequest from './MyRequest';
import MyTask from './MyTask';
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
      <MakeARequest />
      {page === '/myrequests' || page === '/' ? (
        <>
          <SectionCard>People Helping Me</SectionCard>
          {myRequests.map((request) => (
            <MyRequest request={request} key={request.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/mytasks' || page === '/' ? (
        <>
          <SectionCard>People I Am Helping</SectionCard>
          {myTasks.map((task) => (
            <MyTask task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/tasks' || page === '/' ? (
        <>
          <SectionCard>Others Requesting Help</SectionCard>
          {openTasks.map((task) => (
            <OpenTask task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
    </MainFeedContainer>
  );
};

export default MainFeed;
