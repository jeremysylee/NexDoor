/* eslint-disable spaced-comment */
const db = require('../../db/index');

const announcementModel = {
  addAnnouncement: async ({
    userId, announcementBody, date, time,
  }) => {
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
      RETURNING announcement_id
    `;
    try {
      const insertedId = await db.query(queryStr);
      return insertedId.rows;
    } catch (err) {
      return err;
    }
  },

  getAnnouncements: async (quantity) => {
    const queryStr = `
      SELECT *
      FROM nexdoor.announcements
      LIMIT ${quantity}
    ;`;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
};

module.exports = announcementModel;
