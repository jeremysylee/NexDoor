import React from 'react';
import { useSelector } from 'react-redux';
import MyRequest from './MyRequest';
import styled from 'styled-components';
import {
  CardHeaders,
} from './style';

const Card = styled.div`
  max-width: 100%;
  margin-top: 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: hidden;
  flex: 1;
  padding: 1em;
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
