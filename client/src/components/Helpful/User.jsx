import React from 'react';
import { Container, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';

const User = ({ user }) => {
  const { firstname, lastname, average_rating, profile_picture } = user;

  const Card = styled.div`
  width: 40%;
  padding: 2em;
  margin: 1em;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 #BDC9D7;
  overflow: hidden;
  display: inline-block;
`;
  return (
    <Container>
      <Card>
        <Avatar src={profile_picture} />
        {firstname}
        {lastname}
        <StarIcon />
        {average_rating}
      </Card>
    </Container>
  );
};

export default User;