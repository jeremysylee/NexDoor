/* eslint-disable spaced-comment */
const announcementsService = require('./service');

/*________________________________________________________________
TABLE OF CONTENTS
- Add an announcement: 11 - 38
- Get x # of announcements: 42 - 93
________________________________________________________________*/

const announcementsControllers = {
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
  addAnnouncement: async (req, res, next) => {
    const params = {
      userId: req.params.userId || null,
    };
    const body = {
      announcementBody: req.body.announcementBody,
      date: req.body.date,
      time: req.body.time,
    };
    try {
      const success = await announcementsService.addAnnouncement(params, body);
      res.status(200).send(success);
    } catch (err) {
      next(err);
    }
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
  getAnnouncements: async (req, res, next) => {
    const { quantity } = req.params || 25;
    try {
      const announcements = await announcementsService.getAnnouncements(quantity);
      res.status(200).send(announcements);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = announcementsControllers;
