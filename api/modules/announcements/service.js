/* eslint-disable spaced-comment */
const db = require('../../db/index');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const announcementModel = {
  addAnnouncement: async ({ userId }, { announcementBody, date, time }) => {
    if (!announcementBody || !date || !time) {
      throw new ApiError('announcement body, date, or time not defined!', httpStatusCodes.BAD_REQUEST);
    }
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
    const insertedId = await db.query(queryStr);
    return insertedId.rows;
  },

  getAnnouncements: async (quantity) => {
    const queryStr = `
      SELECT *
      FROM nexdoor.announcements
      LIMIT ${quantity}
    ;`;

    const data = await db.query(queryStr);
    return data.rows;
  },
};

module.exports = announcementModel;
