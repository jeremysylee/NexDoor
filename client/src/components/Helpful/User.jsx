import React, { useState } from 'react';
import { Container, Avatar, Grid } from '@material-ui/core';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/Star';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Ratings from 'react-ratings-declarative';

const Card = styled.div`
width: 100%;
padding: 2em;
margin: 1em;
border-radius: 5px;
box-shadow: 0 8px 16px 0 #BDC9D7;
overflow: hidden;
display: inline-block;
`;

const CardContent = styled.div`
  font-family: Roboto;
  margin-left: 1em;
  font-size: 14px;
  font-weight: 400;
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
        <Grid container direction="row" justifyContent="flex-start"
          alignItems="center">
          <div>
            <Avatar src={profile_picture} />
          </div>
          <div>
            <CardContent>asdfasdfasdfa
              {firstname}
              {lastname}
              <div>
                <StarIcon style={{ fill: "red" }} />
                {average_rating}
              </div>
            </CardContent>
          </div>
        </Grid>
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