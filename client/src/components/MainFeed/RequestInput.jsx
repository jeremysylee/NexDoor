import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import NewRequestModal from '../NewRequestModal';

import {
  Row,
  Button,
  ButtonDecline,
} from './styles-MainFeed';

export const InputCard = styled.div`
  max-width: 100%;
  margin-top: 1em;
  padding: 0.75em 1em;
  border-radius: 10px;
  background-color: #FFFFFF;
  overflow: visible;
  flex: 1;
  box-shadow: 2px 2px 3px #cccccc, -1px -1px 27px #f1f2f5;
  color: black;
`;

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
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUserReducer.userData);
  const openModal = () => {
    dispatch({ type: 'TOGGLE_AR_MODAL', toggle: true });
  };

  return (
    <div>
      <InputCard>
        <VerticalLine />
        <Row>
          <Avatar src={user.profile_picture_url} alt={user.firstname} />
          <Input onClick={openModal}>&nbsp;&nbsp;What do you need help with?</Input>
          <NewRequestModal />
        </Row>
        <Line />
        <Row>
          <ButtonDecline onClick={openModal}>Schedule for later</ButtonDecline>
          <Button onClick={openModal}>Make a request</Button>
        </Row>
      </InputCard>
    </div>
  );
};

export default RequestInput;
