import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import NewRequestModal from '../NewRequestModal';

import {
  Row,
  Button,
  ButtonDecline,
  Line,
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
  // background-color: #F1F2F5;
  font-size: 18px;
  font-weight: 300;
  border: none;
  width: 100%;
  // margin-left: 0.5em;
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

const VerticalLine = styled.div`
  background-color: #4496B4;
  width: 4px;
  height: 105px;
  position: absolute;
  transform: scale(1) translate(-720%,-8%);
  border-radius: 60px;
`;

const FlairContainer = styled.div`
  position: absolute;
  top: 130px;
  margin-right: 13px;
`;

const RowFixed = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  border-radius: 100px;
  background-color: #F1F2F5;
  margin-left: 0.5em;
  &:hover ${Input} {
    background-color: #E7E7E7
  }
  &:hover{
    cursor: pointer;
  }
`;

const RequestInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.currentUserReducer.userData);
  const openModal = () => {
    dispatch({ type: 'TOGGLE_AR_MODAL', toggle: true });
  };

  const FlairSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke="url(#paint0_linear)"
        strokeWidth="2"
        d="M13.814 4.806a6.5 6.5 0 11-10.84 7.176 6.5 6.5 0 0110.84-7.176z"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="16.274"
          x2="0.684"
          y1="14.742"
          y2="10.512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.362" stopColor="#DB8457" />
          <stop offset="0.623" stopColor="#4496B4" />
          <stop offset="1" stopColor="#61C0CB" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div>
      <InputCard>
        <VerticalLine />
        <Row>
          <Avatar src={user.profile_picture_url} alt={user.firstname} />
          <RowFixed onClick={openModal}>
            <Input>&nbsp;&nbsp;What do you need help with?</Input>
            <FlairContainer onClick={openModal}><FlairSVG /></FlairContainer>
          </RowFixed>
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
