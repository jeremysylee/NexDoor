/* eslint-disable spaced-comment */
const db = require('../../db/index');

/*________________________________________________________________
TABLE OF CONTENTS
- Add an announcement: 10 - 57
- Get x # of announcements: 59 - 93
________________________________________________________________*/
const announcementControllers = {
  // *************************************************************
  // ADD ANNOUNCEMENT
  // *************************************************************
  //   Needs from Front End - UserId (optional), defaults to null
  //   Returns - String confirmation
  // *************************************************************
  /*
    POST api/announce/${userId}
    req.body = {
      "announcementBody": "There was a robbery at 123 East Main Street last night",
      "date": "10/17/2020",
      "time": "05:25"
    }
    res = 'Added announcement to db'
  */
  // *************************************************************
  addAnnouncement: (req, res) => {
    const { userId } = req.params || null;
    const {
      announcementBody,
      date,
      time,
    } = req.body;

    const queryStr = `
      INSERT INTO nexdoor.announcements (
        user_id,
        announcement_body,
        date,
        time
      )
      VALUES (
        ${userId},
        '${announcementBody}',
        '${date}',
        '${time}'
      )
    `;

    db.query(queryStr)
      .then(() => {
        res.status(200).send('Added announcement to db');
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // ADD ANNOUNCEMENT
  // *************************************************************
  /*
    GET /api/announce/:quantity
    req.body = none
    res =
      [
        {
          "announcement_id": 5,
          "user_id": 16,
          "announcement_body": "There has been a break-in on Frankline street",
          "date": "2021-07-20T07:00:00.000Z",
          "time": "06:15:00"
        },
        ....
      ]
  */
  // *************************************************************
  getAnnouncements: (req, res) => {
    const { quantity } = req.params || 25;
    const queryStr = `
      SELECT *
      FROM nexdoor.announcements
      LIMIT ${quantity}
    ;`;
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

module.exports = announcementControllers;
