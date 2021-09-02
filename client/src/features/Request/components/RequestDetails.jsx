/* eslint camelcase: 0 */ // --> OFF

import React from 'react';
import { useSelector } from 'react-redux';
import LocationPinSvg from '../../../static/LocationPin';
import {
  Col,
  ColCentered,
  DetailsContainer,
  DetailsContainerTime,
  HeadingSmall,
  LocationPinContainer,
  Row,
  RowCenter,
} from './TaskCard.styles';

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
          <Row style={{ justifyContent: 'left', marginTop: '0px' }}>
            <LocationPinContainer>
              <LocationPinSvg style={{ marginRight: '5px' }} />
            </LocationPinContainer>
            <Col>
              <span>{`${street_address}`}</span>
              <span>{`${city} ${state} ${zipcode}`}</span>
            </Col>
          </Row>
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
