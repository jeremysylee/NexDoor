import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

import {
  Row,
} from './styles-MainFeed';

// const url = 'http://localhost:3500';

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

const Input = styled.button`
  border-radius: 100px;
  background-color: #F1F2F5;
  font-size: 16px;
  font-weight: 300;
  border: none;
  width: 100%;
  margin-left: 1em;
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
  margin-bottom: 0px;
`;

const VerticalLine = styled.div`
  background-color: #4496B4;
  width: 4px;
  height: 80px;
  position: absolute;
  transform: scale(1) translate(-655%,-14%);
  border-radius: 60px;
`;

const RequestInput = () => {
  const userId = useSelector((store) => store.currentUserReducer.userId);
  // waiting for userId data

  return (
    <div>
      <Card>
        <VerticalLine />
        <Row>
          <Avatar src="https://static.wikia.nocookie.net/gotham-inc/images/6/6a/Kristin_Kringle.png/revision/latest?cb=20150826211938" alt={userId.toString()} />
          <Input>&nbsp;What do you need help with?</Input>
        </Row>
        <Line />
      </Card>
    </div>
  );
};

export default RequestInput;
