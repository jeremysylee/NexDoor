const express = require('express');

const announcementsController = require('./controller');

const announcements = express.Router();

announcements
  .get('/:quantity', announcementsController.getAnnouncements)
  .post('/:userId', announcementsController.addAnnouncement);

module.exports = announcements;
