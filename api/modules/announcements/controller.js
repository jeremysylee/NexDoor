/* eslint-disable spaced-comment */
const announcementsService = require('./service');

const announcementsControllers = {

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
      const insertedId = await announcementsService.addAnnouncement(params, body);
      res.status(200).send(insertedId);
    } catch (err) {
      next(err);
    }
  },

  getAnnouncements: async (req, res, next) => {
    const { quantity } = req.params;
    try {
      const announcements = await announcementsService.getAnnouncements(quantity);
      res.status(200).send(announcements);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = announcementsControllers;
