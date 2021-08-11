/* eslint-disable spaced-comment */
const db = require('../../db/index');

const messagesModel = {
  addMessage: ({
    taskId, userId, messageBody, date, time, imgUrl = null,
  }) => {
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
    ;`;

    return db.query(queryStr)
      .then(() => 'Added message to db')
      .catch((err) => err);
  },

  getMessagesByTask: (taskId) => {
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
    return db.query(queryStr)
      .then((data) => data)
      .catch((err) => err);
  },
};

module.exports = messagesModel;
