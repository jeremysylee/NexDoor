/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const session = require('express-session');
const db = require('../../db/index');

const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a new user: 15 - 122
- Get user info object: 124 - 186
- Get list of users ordered by highest rating: 188 - 231
- Check if email already exists in db: 233 - 268
- Get a users email and password: 270 - 298
________________________________________________________________*/
const usersService = {
  addUser: async (body, address_id) => {
    const {
      firstName,
      lastName,
      password,
      email,
      imgUrl,
    } = body;
    const hashPass = bcrypt.hashSync(password, 10);

    const queryStr = `
      INSERT INTO nexdoor.users (
        firstname,
        lastname,
        password,
        email,
        address_id,
        karma,
        task_count,
        average_rating,
        profile_picture_url,
        acct_created_timestamp
      )
      VALUES (
        '${firstName}',
        '${lastName}',
        '${hashPass}',
        '${email}',
        ${address_id},
        0,
        0,
        0,
        '${imgUrl}',
        (SELECT CURRENT_TIMESTAMP)
      )
      RETURNING
          user_id, firstname, lastname, email, address_id, karma, task_count, average_rating, profile_picture_url
    `;
    const data = await db.query(queryStr);
    if (!data.rows[0]) { throw new ApiError('Error adding user', httpStatusCodes.INTERNAL_SERVER); }
    const userIdDTO = data.rows[0];
    return userIdDTO;
  },

  getUser: async ({ userId }) => {
    const queryStr = `
      SELECT
        user_id,
        firstname,
        lastname,
        email,
        karma,
        task_count,
        average_rating,
        profile_picture_url, (
          SELECT ROW_TO_JSON(add)
          FROM (
            SELECT
              street_address,
              city,
              state,
              zipcode,
              neighborhood,
              coordinate
            FROM nexdoor.address
            WHERE address_id=nexdoor.users.address_id
          ) add
        ) as address
      FROM nexdoor.users
      WHERE user_id=${userId};
    `;
    const data = await db.query(queryStr);
    if (!data.rows[0]) { throw new ApiError('User not found!', httpStatusCodes.NOT_FOUND); }
    const userDTO = data.rows[0];
    return userDTO;
  },

  getUsers: async (params) => {
    const {
      userId,
      range,
      quantity,
    } = params;

    const queryStr = `
      SELECT
        user_id,
        firstname,
        lastname,
        address_id,
        karma,
        task_count,
        average_rating,
        profile_picture_url,
        (
          SELECT ARRAY_TO_JSON(ARRAY_AGG(reviews))
          FROM (
            SELECT *
            FROM nexdoor.reviews
            WHERE helper_id=nexdoor.users.user_id
          ) reviews
        ) as reviews
      FROM nexdoor.users
      WHERE
        (
          (
            SELECT coordinate
            FROM nexdoor.address
            WHERE address_id=
            (
              SELECT address_id
              FROM nexdoor.users
              WHERE user_id=${userId}
            )
          )
          <@>
          (
            SELECT coordinate
            FROM nexdoor.address
            WHERE address_id=nexdoor.users.address_id
          ) < ${range}
        )
      ORDER BY average_rating
      LIMIT ${quantity}
    `;
    const data = await db.query(queryStr);
    if (!data.rows[0]) { throw new ApiError('No users found', httpStatusCodes.NOT_FOUND); }
    const usersDTO = data.rows;
    return usersDTO;
  },

  authenticateLogin: async ({ submittedPassword }, { password }) => {
    if (!bcrypt.compareSync(submittedPassword, password)) {
      throw new ApiError('Passwords do not match, wrong password', httpStatusCodes.NOT_FOUND);
    }
    return true;
  },

  authenticateSession: async ({ sessionUserId }) => {
    if (!sessionUserId) {
      throw new ApiError('No session found', httpStatusCodes.NOT_FOUND);
    }
    const userIdDTO = { userId: sessionUserId };
    return userIdDTO;
  },

  checkForEmail: async ({ email }) => {
    const queryStr = `
      SELECT user_id, password
      FROM nexdoor.users
      WHERE email='${email}'
    `;
    const data = await db.query(queryStr);
    if (!data.rows[0]) {
      return false;
    }
    const userCredentialsDTO = { userId: data.rows[0].user_id, password: data.rows[0].password };
    return userCredentialsDTO;
  },
};

module.exports = usersService;
