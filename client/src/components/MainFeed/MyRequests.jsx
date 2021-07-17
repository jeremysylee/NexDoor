import React from 'react';
import { useSelector } from 'react-redux';
import MyRequest from './MyRequest';
import {
  CardHeaders,
  SectionCard,
} from './styles-MainFeed';

const MyRequests = () => {
  const placeholder = 'People Helping Me';
  const requests = useSelector((store) => store.requestsReducer.requests);

  return (
    <div>
      <SectionCard>
        <CardHeaders>{placeholder}</CardHeaders>
      </SectionCard>
      {requests.map((request) => (
        <MyRequest request={request} key={request.task_id} />
      ))}
    </div>
  );
};

export default MyRequests;
