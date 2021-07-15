import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
// import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';
import Header from '../Header';
import Sidebar from '../Sidebar';

const ModalHeaderContent = styled.div`
font-family: Roboto;
margin-left: 1em;
font-size: 14px;
font-weight: 400;
text-align: center;
`;


const Active = () => {
  const [show, setShow] = useState(false);
  const [review, setReview] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReview = (e) => setReview(e.target.value);

  console.log(review);


  return (
    <div>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ fontStyle: 'Roboto' }}
      >
        <Sidebar />
        <Button onClick={handleShow}>Mark as finished!</Button>
      </Grid>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <ModalHeaderContent>
            <Modal.Title>Your helper</Modal.Title>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              pfp
            </div>
            <span style={{ display: 'flex', justifyContent: 'center' }}>
              First and Last name
            </span>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
    </div>
  )
}

export default Active;