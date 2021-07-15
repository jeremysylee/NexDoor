import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import Ratings from 'react-ratings-declarative';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';

const MarkFinishButton = styled.div`
margin-top: 3em;
display: flex;
justify-content: center;
`;

const ActiveModal = () => {
  const [show, setShow] = useState(false);
  const [review, setReview] = useState('');
  const [ratings, setRatings] = useState(0);
  const [reviewStar, setReviewStar] = useState('');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReview = (e) => setReview(e.target.value);

  console.log(review);
  const changeRating = (val) => {
    setRatings(val);

    if (val === 1) {
      setReviewStar('1 star - Poor')
    } else if (val === 2) {
      setReviewStar('2 stars - Fair')
    } else if (val === 3) {
      setReviewStar('3 stars - Average')
    } else if (val === 4) {
      setReviewStar('4 stars - Good')
    } else if (val === 5) {
      setReviewStar('5 stars - Great')
    }
  };

  return (
    <div>
      <MarkFinishButton>
        <Button onClick={handleShow} style={{ backgroundColor: "#D65454", borderRadius: '24px', height: '50px', width: '200px', borderColor: '#D65454' }}>Mark as finished!</Button>
      </MarkFinishButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ fontStyle: 'Roboto', textAlign: 'center' }}
          >
            <div>
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
            </div>
          </Grid>
        </Modal.Header>
        <Modal.Body>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ fontStyle: 'Roboto' }}
          >
            <div>
              Rate your helper!
              <br />
              <p>{reviewStar}</p>
              <Ratings
                changeRating={changeRating}
                rating={ratings}
                widgetDimensions="25px"
                widgetRatedColors="#E35555"
                widgetSpacings="0px"
                widgetHoverColors="#E35555"
              >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
              </Ratings>
            </div>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ fontStyle: 'Roboto' }}
          >
            <div style={{ width: '30vw', fontFamily: 'Roboto' }}>
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
            </div>
            <br />
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'right', marginRight: '1em' }}>
            <Button
              style={{ borderRadius: '24px', height: '50px', width: '200px', backgroundColor: '#D65454', borderColor: '#D65454' }}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ActiveModal;