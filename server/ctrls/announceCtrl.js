/* eslint-disable spaced-comment */
const announcementModels = require('../models/announceModel');

/*________________________________________________________________
TABLE OF CONTENTS
- Add an announcement: 11 - 38
- Get x # of announcements: 42 - 93
________________________________________________________________*/

const announcementControllers = {
  // *************************************************************
  // ADD ANNOUNCEMENT
  // *************************************************************
  /*
      POST api/announce/${userId}
      req:
        params: UserId (optional), defaults to null
        req.body = {
          "announcementBody": "There was a robbery at 123 East Main Street last night",
          "date": "10/17/2020",
          "time": "05:25"
        }
      res: 'Added announcement to db'
  */
  addAnnouncement: (req, res) => {
    const { userId } = req.params || null;
    announcementModels.addAnnouncement(userId, req.body)
      .then((success) => res.status(200).send(success))
      .catch((err) => res.status(400).send(err.stack));
  },

  // *************************************************************
  // GET ANNOUNCEMENT
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
  getAnnouncements: (req, res) => {
    const { quantity } = req.params || 25;
    announcementModels.getAnnouncements(quantity)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
};

module.exports = announcementControllers;
