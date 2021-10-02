import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  OpenTaskTile, MyRequestTile, MyTaskTile,
} from './RequestTile';
import MakeRequestInput from './MakeRequestInput';
import FeedHeader from './FeedHeader';
import {
  SectionTileHeaderContainer,
  SectionLine,
} from './Request.styles';

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
      <FeedHeader />
      <MakeRequestInput />
      {page === '/myrequests' || page === '/' ? (
        <>
          <SectionTileHeaderContainer>My Requests</SectionTileHeaderContainer>
          {myRequests.map((request) => (
            <MyRequestTile request={request} key={request.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/mytasks' || page === '/' ? (
        <>
          <SectionTileHeaderContainer>People I Am Helping</SectionTileHeaderContainer>
          {myTasks.map((task) => (
            <MyTaskTile task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
      <SectionLine />
      {page === '/tasks' || page === '/' ? (
        <>
          <SectionTileHeaderContainer>Neighbors Requesting Help</SectionTileHeaderContainer>
          {openTasks.map((task) => (
            <OpenTaskTile task={task} key={task.task_id} />
          ))}
        </>
      ) : <></>}
    </MainFeedContainer>
  );
};

export default RequestFeed;
