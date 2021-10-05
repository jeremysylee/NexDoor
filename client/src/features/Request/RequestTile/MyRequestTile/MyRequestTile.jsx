import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import sadAlien from '../../../../static/sadAlien.png';

import useFormatDate from '../../hooks/useFormatDate';

import {
  Card,
  CardContent,
  Description,
  Row,
  RowRight,
  StatusBadge,
  Subdetails,
  Username,
} from '../../Request.styles';

StatusBadge.defaultProps = {
  theme: {
    statusColor: '#f50257',
  },
};

const MyRequest = ({ request }) => {
  const currentUserId = useSelector((store) => store.currentUserReducer.userData.user_id);
  const dispatch = useDispatch();
  const { day, time } = useFormatDate(request.start_date, request.start_time);

  // STATUS TRANSLATION //
  /* Status's here are being translated for the current users perspective as a requester.
  A request status that is 'Open' will appear as "Unclaimed".
  A request status that is 'Pending' will appear as "Claimed" */
  const [status, setStatus] = useState(0);
  const translateStatus = () => {
    if (request.status === 'Open') { return 'Unclaimed'; }
    if (request.status === 'Pending') { return 'Claimed'; }
    return request.status;
  };

  // COLOR THEMING FOR STATUS BADGE //
  const [color, setColor] = useState('#f50257');
  const theme = {
    statusColor: color,
  };
  const getColor = () => {
    if (status === 'Unclaimed') { setColor('#7E7E7E'); }
    if (status === 'Claimed') { setColor('#e87f4c'); }
    if (status === 'Active') { setColor('#1698b7'); }
    if (status === 'Closed') { setColor('#F3960A'); }
    if (status === 'Completed') { setColor('#666666'); }
  };

  useEffect(() => {
    setStatus(translateStatus());
    getColor();
  });

  const selectTaskHandler = () => {
    dispatch({ type: 'SET_TASK', task: request });
    dispatch({ type: 'TOGGLE_REQUEST_MODAL', toggle: true });

    if (request.status === 'Open' && request.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'unclaimed',
        statusText: 'No one has claimed your request yet...',
      });
    }
    if (request.status === 'Pending' && request.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'claimed',
        statusText: `${request.helper.firstname} has claimed your request!`,
      });
    }
    if (request.status === 'Active' && request.requester.user_id === currentUserId) {
      return dispatch({
        type: 'SET_CATEGORY',
        role: 'requester',
        status: 'active',
        statusText: 'is helping you with this request!',
      });
    }
    return <></>;
  };

  return (
    <>
      <Card onClick={selectTaskHandler}>
        <RowRight>
          <ThemeProvider theme={theme}>
            <StatusBadge>{status}</StatusBadge>
          </ThemeProvider>
        </RowRight>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row style={{ marginBottom: '0.5em' }}>
            {request.status === 'Open' && <Avatar src={sadAlien} alt="?" />}
            {request.status !== 'Open' && <Avatar src={request.helper.profile_picture_url} alt={request.helper.firstname} />}
            <CardContent>
              {request.status === 'Open' && <Username>No one has claimed your request yet!</Username>}
              {request.status !== 'Open' && <Username>{`${request.helper.firstname} ${request.helper.lastname} is helping you with this request`}</Username>}
              <Subdetails>{`${day} ${time}`}</Subdetails>
            </CardContent>
          </Row>
        </Row>
        <Description>{`${request.description.substring(0, 60)}...`}</Description>
      </Card>
    </>
  );
};

MyRequest.propTypes = {
  request: PropTypes.shape({
    requester: PropTypes.shape({
      user_id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      profile_picture_url: PropTypes.string.isRequired,
    }),
    helper: PropTypes.shape({
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      profile_picture_url: PropTypes.string.isRequired,
    }),
    task_id: PropTypes.number,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number,
    start_date: PropTypes.string,
    start_time: PropTypes.string,
    car_required: PropTypes.bool,
    status: PropTypes.oneOf(['Open', 'Pending', 'Active', 'Complete', 'Closed']),
  }).isRequired,
};

export default MyRequest;
