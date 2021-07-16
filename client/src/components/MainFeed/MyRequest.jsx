import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { useHistory } from 'react-router-dom';

import useFormatDate from './hooks/useFormatDate';

import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Subdetails,
  StatusBadge,
} from './styles-MainFeed';

StatusBadge.defaultProps = {
  theme: {
    statusColor: '#f50257',
  },
};

const MyRequest = ({ request }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { day, time } = useFormatDate(request.start_date, request.start_time);

  // ************************************************************* //

  // STATUS TRANSLATION //

  /* Status's here are being translated for the current users perspective.
  A request status that is 'open' will appear as "Unclaimed".
  Once a helper claims the requesters task, the task status converts to 'Pending' which
  will appear as "Claimed" to the requester.
  */

  const [status, setStatus] = useState(0);
  const translateStatus = () => {
    if (request.status === 'Open') { return 'Unclaimed'; }
    if (request.status === 'Pending') { return 'Claimed'; }
    return request.status;
  };

  // ************************************************************* //

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

  // ************************************************************* //

  useEffect(() => {
    getColor();
    setStatus(translateStatus());
  });

  const selectTaskHandler = () => {
    if (request.status === 'Active') {
      history.push('/active');
    }
    dispatch({
      type: 'SET_TASK', task: request,
    });
  };

  // ??
  if (request.status === 'open') {
    return (<div>hello</div>);
  }
  return (
    <Card onClick={selectTaskHandler}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row style={{ marginBottom: '0.5em' }}>
          {request.status === 'Open' && <Avatar src="potato" alt="?" />}
          {request.status !== 'Open' && <Avatar src={request.helper.profile_picture_url} alt={request.helper.firstname} />}
          <CardContent>
            {request.status === 'Open' && <Username>No one has claimed your request yet!</Username>}
            {request.status !== 'Open' && <Username>{`${request.helper.firstname} ${request.helper.lastname} is helping you with this request`}</Username>}
            <Subdetails>{`${day} ${time}`}</Subdetails>
          </CardContent>
        </Row>
        <DetailsCol>
          <ThemeProvider theme={theme}>
            <StatusBadge>{status}</StatusBadge>
          </ThemeProvider>
        </DetailsCol>
      </Row>
      <Description>{`${request.description.substring(0, 60)}...`}</Description>
    </Card>
  );
};

MyRequest.propTypes = {
  request: PropTypes.shape({
    requester: PropTypes.shape({
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
