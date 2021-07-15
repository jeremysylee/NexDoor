import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyRequest from './MyRequest';
import {
  CardHeaders,
} from './MainFeedStyles';

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

const MyRequests = () => {
  const placeholder = 'People Helping Me';
  const requests = useSelector((store) => store.requestsReducer.requests);

  return (
    <div>
      <Card>
        <CardHeaders>{placeholder}</CardHeaders>
      </Card>
      {requests.map((request) => (
        <MyRequest request={request} key={request.task_id} />
      ))}
    </div>
  );
};

export default MyRequests;
