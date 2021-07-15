import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import styled, { ThemeProvider } from 'styled-components';

import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Details,
} from './MainFeedStyles';

const StatusBadge = styled.div`
  border-radius: 100px;
  height: 20px;
  width: 100px;
  z-index: 1;
  background-color: ${(props) => props.theme.statusColor};
  position: absolute;
  text-align: center;
  padding: 1px;
  color: white;
  font-size: 0.75rem;
  font-weight: 400;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: scale(1) translate(15%, -135%);
  transform-origin: 0% 0%;
  box-sizing: border-box;
`;

StatusBadge.defaultProps = {
  theme: {
    statusColor: '#f50257',
  },
};

const MyRequest = ({ request }) => {
  const dispatch = useDispatch();

  // 0: unclaimed, 1: pending, 2: active;
  const [status, setStatus] = useState(0);
  const [color, setColor] = useState('#f50257');

  const theme = {
    statusColor: color,
  };

  const getColor = () => {
    if (status === 'Pending') { setColor('#f50257'); }
    if (status === 'Active') { setColor('#1A97DD'); }
    if (status === 'Closed') { setColor('#F3960A'); }
    if (status === 'Completed') { setColor('#666666'); }
  };

  useEffect(() => {
    setStatus(request.status);
    getColor();
  });

  const selectTaskHandler = () => {
    dispatch({
      type: 'SET_TASK', task: request,
    });
  };

  if (request.status === 'open') {
    return (<div>hello</div>);
  }
  return (
    <Card onClick={selectTaskHandler}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={request.user.profile_picture} alt="profilePHoto" />
          <CardContent>
            <Username>{`${request.user.firstname} ${request.user.lastname}`}</Username>
            <Description>{`${request.description.substring(0, 60)}...`}</Description>
          </CardContent>
        </Row>
        <DetailsCol>
          <ThemeProvider theme={theme}>
            <StatusBadge>{status}</StatusBadge>
          </ThemeProvider>
          <Details>charmeleon</Details>
          <Details>charmander</Details>
        </DetailsCol>
      </Row>
    </Card>
  );
};

MyRequest.propTypes = {
  request: PropTypes.shape({
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
    }),
    task_id: PropTypes.number,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    car_required: PropTypes.bool,
    status: PropTypes.oneOf(['Open', 'Pending', 'Active', 'Complete', 'Closed']),
  }).isRequired,
};

export default MyRequest;
