import React, { useState } from 'react';
import { Container, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Ratings from 'react-ratings-declarative';

const Card = styled.div`
width: 40%;
padding: 2em;
margin: 1em;
border-radius: 5px;
box-shadow: 0 8px 16px 0 #BDC9D7;
overflow: hidden;
display: inline-block;
`;

const Name = styled.div`
float: left;
`;

const User = ({ user }) => {
  const { firstname, lastname, average_rating, profile_picture, response_count } = user;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Card onClick={handleShow}>
        <Avatar src={profile_picture} />
        <Name>
          {firstname}
          {lastname}
        </Name>
        <StarIcon style={{ fill: "red" }} />
        {average_rating}
        {/* <Ratings
              rating={4}
              widgetDimensions="16px"
              widgetRatedColors="rgb(87, 87, 87)"
              widgetSpacings="0px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings> */}
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={profile_picture} />
          </div>
          <span style={{ display: 'flex', justifyContent: 'center' }}>{firstname} {lastname}</span>
          <div style={{ display: 'flex', justifyContent: 'center' }}><StarIcon style={{ fill: "red" }} /> {average_rating} ({response_count})</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default User;