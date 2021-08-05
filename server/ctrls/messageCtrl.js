/* eslint-disable spaced-comment */
const messagesModel = require('../models/messagesModel');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a message for a task & user: 10 - 28
- Get all messages for a task: 30 - 61
________________________________________________________________*/

const messagesControllers = {
  // *************************************************************
  // ADD A MESSAGE
  // *************************************************************
  /*
    POST /api/messages/:taskId/:userId
    REQUEST:
      params: taskId, userId,
      req.body = {
        "messageBody": "I\u0027m going out of town",
        "date": "06/13/2021",
        "time": "04:21"
    RESPONSE:
      string confirmation: 'Added message to db'                */

  addMessage: (req, res) => {
    messagesModel.addMessage(req.params, req.body)
      .then((success) => res.status(200).send(success))
      .catch((err) => res.status(400).send(err.stack));
  },

  // *************************************************************
  // GET MESSAGES BY TASKID
  // *************************************************************
  /*
    GET /api/messages/${taskId}
    REQUEST:
      params: taskId
      req.body = none
    RESPONSE:
      [
        {
          "firstname": "andrew",
          "lastname": "munoz",
          "message_body": "where are you",
          "date": "2021-06-13T07:00:00.000Z",
          "time": "04:51:00"
        },
        {
          "firstname": "Spongebob",
          "lastname": "Squarepants",
          "message_body": "i have no idea where i am",
          "date": "2021-04-13T07:00:00.000Z",
          "time": "06:21:00"
        },
      ]
  */
  getMessagesByTask: (req, res) => {
    const { taskId } = req.params;
    messagesModel.getMessagesByTask(taskId)
      .then((data) => res.status(200).send(data.rows))
      .catch((err) => res.status(400).send(err.stack));
  },
};

module.exports = messagesControllers;
