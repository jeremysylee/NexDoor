import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

import {
  Card,
  Row,
  Button,
  ButtonDecline,
} from './styles-MainFeed';

const Input = styled.button`
  border-radius: 100px;
  background-color: #F1F2F5;
  font-size: 18px;
  font-weight: 300;
  border: none;
  width: 100%;
  margin-left: 0.5em;
  padding-top: 4px;
  text-align: left;
  color: #5E5E5E;
  font-family: Roboto;
  -webkit-transition: 200ms linear;
  -moz-transition: 200ms linear;
  -ms-transition: 200ms linear;
  -o-transition: 200ms linear;
  transition: 200ms linear;
  &:hover {
    background-color: #E7E7E7
  }
`;

const Line = styled.hr`
  color: #BDBDBD;
  margin-bottom: 6px;
  margin-top: 13px;
`;

const VerticalLine = styled.div`
  background-color: #4496B4;
  width: 4px;
  height: 105px;
  position: absolute;
  transform: scale(1) translate(-720%,-8%);
  border-radius: 60px;
`;

const RequestInput = () => {
  const user = useSelector((store) => store.currentUserReducer);
  // waiting for userId data

  return (
    <div>
      <Card>
        <VerticalLine />
        <Row>
          <Avatar src={user.profile_picture_url} alt={user.userId.toString()} />
          <Input>&nbsp;What do you need help with?</Input>
        </Row>
        <Line />
        <Row>
          <ButtonDecline>Schedule for later</ButtonDecline>
          <Button>Make a request</Button>
        </Row>
      </Card>
    </div>
  );
};

export default RequestInput;
