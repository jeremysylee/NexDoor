/* eslint-disable spaced-comment */
const db = require('../../db/index');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const announcementModel = {
  addAnnouncement: async ({ userId }, { announcementBody, date, time }) => {
    if (!announcementBody || !date || !time) {
      throw new ApiError('Error adding announcement: body / date / time not defined!', httpStatusCodes.BAD_REQUEST);
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
    const insertedIdDTO = insertedId.rows[0];
    return insertedIdDTO;
  },

  getAnnouncements: async (quantity) => {
    const queryStr = `
      EXPLAIN ANALYZE
      SELECT *
      FROM nexdoor.announcements
      LIMIT ${quantity}
    ;`;
    const data = await db.query(queryStr);
    if (!data.rows.length > 0) { throw new ApiError('No announcements found', httpStatusCodes.NOT_FOUND); }

    const announcementsDTO = data.rows;
    return announcementsDTO;
  },
};

module.exports = announcementModel;
