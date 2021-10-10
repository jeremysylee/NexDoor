import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Ratings from 'react-ratings-declarative';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';

const MarkFinishButton = styled.div`
margin-top: 3em;
display: flex;
justify-content: center;
`;

const ActiveModal = () => {
  const [show, setShow] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [ratings, setRatings] = useState(0);
  const [reviewStar, setReviewStar] = useState('');

  const selectTask = useSelector((store) => store.selectedTaskReducer.task);
  console.log('selected task', selectTask);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReview = (e) => setNewReview(e.target.value);

  console.log(newReview);
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

  const url = 'http://localhost:3500';

  const submitReview = () => {
    const reviewSubmission = { review: newReview };
    axios.put(`${url}/api/tasks/${selectTask.task_id}/status/close/${ratings}`, reviewSubmission)
      .then((res) => console.log(res))
      .then(() => { history.push('/'); })
      .catch((err) => { console.error(err); });
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar src={selectTask.helper.profile_picture_url} />
              </div>
              <br />
              <div >
                {selectTask.helper.firstname}
                &nbsp;
                {selectTask.helper.lastname}
              </div>
              <br />
              <div >
                {selectTask.helper.task_count > 0 ? (
                  <span>
                    <StarIcon style={{ fill: "red" }} />
                    {selectTask.helper.avg_rating}
                    &nbsp;
                    ({selectTask.helper.task_count})
                  </span>
                ) : (
                  <p>Submit {selectTask.helper.firstname}'s first rating!</p>
                )}
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
                  <Form.Label>
                    Leave kind word for {selectTask.helper.firstname} {selectTask.helper.lastname}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder={`${selectTask.helper.firstname} was very friendly and very helpful...`}
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
              onClick={submitReview}
            >
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActiveModal;