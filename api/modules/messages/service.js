/* eslint-disable spaced-comment */
/* eslint-disable object-curly-newline*/
const db = require('../../db/index');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const messagesService = {
  addMessage: async (
    { taskId, userId },
    { messageBody, date, time, imgUrl = null },
  ) => {
    if (!taskId || !userId) { throw new ApiError('Task Id / UserId undefined!', httpStatusCodes.BAD_REQUEST); }
    if (!messageBody || !date || !time) { throw new ApiError('MessageBody / date / time is not defined', httpStatusCodes.BAD_REQUEST); }
    const queryStr = `
      INSERT INTO nexdoor.messages
      (
        task_id,
        user_id,
        message_body,
        date,
        time,
        photo_url
      )
      VALUES
      (
        ${taskId},
        ${userId},
        '${messageBody}',
        '${date}',
        '${time}',
        '${imgUrl}'
      )
      RETURNING message_id
    ;`;
    const messageId = await db.query(queryStr);
    if (!messageId) { throw new ApiError('Error adding message to the db', httpStatusCodes.INTERNAL_SERVER); }
    const messageIdDTO = messageId.rows[0];
    return messageIdDTO;
  },

  getMessagesByTask: async (taskId) => {
    if (!taskId) { throw new ApiError('No task Id defined', httpStatusCodes.BAD_REQUEST); }
    const queryStr = `
      SELECT
        nexdoor.users.user_id,
        firstname,
        lastname,
        message_body,
        date,
        time,
        profile_picture_url
      FROM
        nexdoor.messages
      INNER JOIN
        nexdoor.users
        ON nexdoor.users.user_id=nexdoor.messages.user_id
      WHERE
        task_id=${taskId}
      ORDER BY
        date ASC,
        time ASC;
    `;
    const messages = await db.query(queryStr);
    if (!messages.rows.length > 0) { throw new ApiError('No messages found', httpStatusCodes.NOT_FOUND); }
    const messagesDTO = messages.rows;
    return messagesDTO;
  },
};

module.exports = messagesService;
