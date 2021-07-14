import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';

import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Details,
  CardHeaders,
} from './style';

const MyRequest = ({ request }) => {
  const placeholder = 'placeholder';

  return (
    <Card>
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          <Avatar src={request.user.profile_picture} alt="profilePHoto" />
          <CardContent>
            <Username>{`${request.user.firstname} ${request.user.lastname}`}</Username>
            <Description>{`${request.description.substring(0,60)}...`}</Description>
          </CardContent>
        </Row>
      </Row>
      <DetailsCol>
        <Details>wobuffet</Details>
        <Details>charmander</Details>
      </DetailsCol>
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
  }).isRequired,
};

export default MyRequest;
