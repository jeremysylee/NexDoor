/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Col } from '../../../components/App.styles';

const RequestInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1.5em 0em;
  padding: 1.2em 2.5em;
  border-radius: 20px;
  background-color: white;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
`;

const InfoBody = styled.div`
  font-weight: 300;
  font-size: 14px;
`;

const InfoDetails = styled(InfoBody)`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 1.3;
`;

const RequestInfoCard = () => {
  const selectedTask = useSelector((store) => store.selectedTaskReducer.task);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = selectedTask.location;

  return (
    <RequestInfoContainer>
      <Col>
        <InfoDetails style={{ marginBottom: '10px' }}><b>Location:</b></InfoDetails>
        <InfoDetails>{street_address}</InfoDetails>
        <InfoDetails>{`${city}, ${state} ${zipcode}`}</InfoDetails>
      </Col>
    </RequestInfoContainer>
  );
};

export default RequestInfoCard;
