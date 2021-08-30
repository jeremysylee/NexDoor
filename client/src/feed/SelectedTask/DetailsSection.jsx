/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Col,
  ColCentered,
  DetailsContainer,
  DetailsContainerTime,
  HeadingSmall,
  Row,
  RowCenter,
} from './styles-SelectedTask';

const DetailsSection = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  const date = useSelector((store) => store.taskDataFormattedReducer.date);
  const time = useSelector((store) => store.taskDataFormattedReducer.time);
  const {
    street_address,
    city,
    state,
    zipcode,
  } = task.location;

  return (
    <ColCentered>
      <RowCenter>
        <DetailsContainer>
          <HeadingSmall>REQUEST DETAILS</HeadingSmall>
          <p>{task.description}</p>
        </DetailsContainer>
      </RowCenter>
      <Row>
        <DetailsContainer>
          <HeadingSmall>TASK LOCATION</HeadingSmall>
          <Col>
            <span>{`${street_address}`}</span>
            <span>{`${city} ${state} ${zipcode}`}</span>
          </Col>
        </DetailsContainer>
        <DetailsContainerTime>
          <HeadingSmall>TIME</HeadingSmall>
          <Col>
            <span>{`${date}`}</span>
            <span>{`${time}`}</span>
          </Col>
        </DetailsContainerTime>
      </Row>
    </ColCentered>
  );
};

export default DetailsSection;
