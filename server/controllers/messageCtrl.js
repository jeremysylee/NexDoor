/* eslint-disable spaced-comment */
const db = require('../../db/index');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a message for a task & user: 10 - 56
- Get all messages for a task: 58 - 107
________________________________________________________________*/
const messagesControllers = {
  // *************************************************************
  // ADD A MESSAGE
  // *************************************************************
  //   Needs from Front End - taskId, userId, messageBody
  //   Returns - String confirmation
  // *************************************************************
  /*
    POST /api/messages/:taskId/:userId
    req.body = {
      "messageBody": "I\u0027m going out of town",
      "date": "06/13/2021",
      "time": "04:21"
    }
    res = 'Added message to db'
  */
  // *************************************************************
  addMessage: (req, res) => {
    const { taskId, userId } = req.params;
    const { messageBody, date, time } = req.body;
    const queryStr = `
      INSERT INTO nexdoor.messages
      (
        task_id,
        user_id,
        message_body,
        date,
        time
      )
      VALUES
      (
        ${taskId},
        ${userId},
        '${messageBody}',
        '${date}',
        '${time}'
      )
    ;`;

    db.query(queryStr)
      .then(() => {
        res.status(200).send('Added message to db');
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // GET MESSAGES BY TASKID
  // *************************************************************
  /*
    GET /api/messages/${taskId}
    req.body = none
    res = [
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
  // *************************************************************
  getMessagesByTask: (req, res) => {
    const { taskId } = req.params;
    const queryStr = `
      SELECT
        firstname,
        lastname,
        message_body,
        date,
        time
      FROM
        nexdoor.messages
      INNER JOIN
        nexdoor.users
        ON nexdoor.users.user_id=nexdoor.messages.user_id
      WHERE
        task_id=${taskId};
    `;
    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************
};

module.exports = messagesControllers;
