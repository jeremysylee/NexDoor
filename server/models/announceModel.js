/* eslint-disable spaced-comment */
const db = require('../../db/index');

const announcementModels = {
  addAnnouncement: (
    userId, announcementBody, date, time,
  ) => {
    const queryStr = `
      INSERT INTO nexdoor.announcements (
        user_id,
        message_body,
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

    return db.query(queryStr)
      .then(() => 'Added announcement to db')
      .catch((err) => err);
  },

  getAnnouncements: (quantity) => {
    const queryStr = `
      SELECT *
      FROM nexdoor.announcements
      LIMIT ${quantity}
    ;`;
    return db.query(queryStr)
      .then((data) => data)
      .catch((err) => err);
  },
  // *************************************************************
};

module.exports = announcementModels;
