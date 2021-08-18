const express = require('express');

const announcementsController = require('./controller');

const announcements = express.Router();

announcements
  .get('/', announcementsController.getAnnouncements)
  .post('/', announcementsController.addAnnouncement);

module.exports = announcements;
