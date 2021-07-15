import PropTypes from 'prop-types';

import React from 'react';
import { Avatar } from '@material-ui/core';
import {
  Card,
  Row,
  CardContent,
  Username,
  Description,
  DetailsCol,
  Details,
} from './styles-MainFeed';

const TaskCard = ({ task }) => (
  <Card onClick={selectTaskHandler}>
    <Row style={{ justifyContent: 'space-between' }}>
      <Row>
        <Avatar src={task.user.profile_picture} alt="profilePHoto" />
        <CardContent>
          <Username>{`${task.user.firstname} ${task.user.lastname}`}</Username>
          <Description>{`${task.description.substring(0, 60)}...`}</Description>
        </CardContent>
      </Row>
      <DetailsCol>
        <Details>{day}</Details>
        <Details>{time}</Details>
      </DetailsCol>
    </Row>
  </Card>
);

TaskCard.propTypes = {
  task: PropTypes.shape({
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
  formatDate: PropTypes.func.isRequired,
};

export default TaskCard;