import React from 'react';
import { useSelector } from 'react-redux';

import {
  SelectedTaskContainer,
  AvatarLg,
  Username,
  UserInfo,
  StatusText,
  DetailsContainer,
  HeadingSmall,
  Row,
  // Col,
  Button,
  ButtonDecline,
} from './styles-SelectedTask';

const OpenRequest = () => {
  const task = useSelector((store) => store.selectedTaskReducer.task);
  // const date = useSelector((store) => store.taskDataFormattedReducer.date);
  // const time = useSelector((store) => store.taskDataFormattedReducer.time);
  // const {
  //   streetAddress,
  //   city,
  //   state,
  //   zipcode,
  // } = task.address;

  // function to get user from task.helper_id
  // Temp data below
  const helper = {
    id: 1,
    firstname: 'Huge',
    lastname: 'Jackedman',
    address_id: 1,
    karma: 5,
    response_count: 24,
    average_rating: 4.7,
    profile_picture: 'https://www.indiewire.com/wp-content/uploads/2017/06/0000246240.jpg',
  };

  return (
    <SelectedTaskContainer>
      <AvatarLg
        src={helper.profile_picture}
        alt={helper.firstname}
      />
      <Username>{`${helper.firstname} ${helper.lastname}`}</Username>
      <UserInfo>
        <span>{`★ ${helper.average_rating}`}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>1.2 miles away</span>
      </UserInfo>
      <StatusText>has claimed your request!</StatusText>
      <Row>
        <ButtonDecline>Decline</ButtonDecline>
        <Button>Approve</Button>
      </Row>
      <DetailsContainer>
        <HeadingSmall>REQUEST DETAILS</HeadingSmall>
        <p>{task.description}</p>
      </DetailsContainer>
      {/* <button>Next</button> */}
    </SelectedTaskContainer>
  );
};

export default OpenRequest;
