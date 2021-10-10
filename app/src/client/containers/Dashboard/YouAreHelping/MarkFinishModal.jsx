import React, { useState } from 'react';
import { Container, Grid, Avatar } from '@material-ui/core';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import StarIcon from '@material-ui/icons/Star';
import styled from 'styled-components';

const MarkFinishButton = styled.div`
margin-top: 3em;
display: flex;
justify-content: center;
`;

const MarkFinishModal = () => {
  const [appear, setAppear] = useState(false);
  const [taskFinish, setTaskFinish] = useState('');

  const handleClose = () => setAppear(false);
  const handleShow = () => setAppear(true);
  const handleFinish = (e) => setTaskFinish(e.target.value);

  console.log(taskFinish);

  return (
    <div>
      <MarkFinishButton>
        <Button onClick={handleShow} style={{ backgroundColor: "#D65454", borderRadius: '24px', height: '50px', width: '200px', borderColor: '#D65454' }}>Mark as finished!</Button>
      </MarkFinishButton>
      <Modal show={appear} onHide={handleClose}>
        <Modal.Header >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ fontStyle: 'Roboto', textAlign: 'center' }}
          >
            <div>
              <Modal.Title>Prove it</Modal.Title>
            </div>
          </Grid>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
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
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Describe what you finished..."
                    onChange={handleFinish}
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
  );
};

export default MarkFinishModal;