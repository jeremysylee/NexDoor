import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
// import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';

const ModalHeaderContent = styled.div`
font-family: Roboto;
font-size: 14px;
font-weight: 400;
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
`;


const Active = () => {
  const [show, setShow] = useState(false);
  const [review, setReview] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReview = (e) => setReview(e.target.value);

  console.log(review);


  return (
    <Container>

      <Header />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ fontStyle: 'Roboto' }}
      >
        <Sidebar />
      </Grid>
      <Button onClick={handleShow}>Mark as finished!</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <ModalHeaderContent>
            <Modal.Title>Your helper</Modal.Title>
            <br />
            <div >
              pfp
            </div>
            <br />
            <div >
              First and Last name
            </div>
            <br />
            <div >
              <StarIcon style={{ fill: "red" }} />
              rating (count)
            </div>
          </ModalHeaderContent>
        </Modal.Header>
        <Modal.Body>
          <div>
            Rate your helper!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Leave kind word for Name</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Name was very friendly and very helpful..."
                onChange={handleReview}
              />
            </Form.Group>
          </Form>
          <div>
            <Button variant="secondary" >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Active;