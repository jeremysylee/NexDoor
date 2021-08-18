/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const session = require('express-session');
const db = require('../../../db/index');
const getCoordinates = require('../../models/coordinates');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a new user: 15 - 122
- Get user info object: 124 - 186
- Get list of users ordered by highest rating: 188 - 231
- Check if email already exists in db: 233 - 268
- Get a users email and password: 270 - 298
________________________________________________________________*/
const userControllers = {
  addUser: async (body) => {
    const {
      streetAddress,
      city,
      state,
      zipcode,
      firstName,
      lastName,
      password,
      email,
    } = body;
    const hashPass = bcrypt.hashSync(password, 10);

    const { imgUrl, neighborhood } = body || null;

    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    let coordinate;
    const queryStr = `
      WITH X AS (
        INSERT INTO nexdoor.address (
          street_address,
          city,
          state,
          zipcode,
          neighborhood,
          coordinate
        )
        VALUES (
          '${streetAddress}',
          '${city}',
          '${state}',
          ${zipcode},
          '${neighborhood}',
          ${coordinate}
        )
        RETURNING address_id
      )
      INSERT INTO nexdoor.users (
        firstname,
        lastname,
        password,
        email,
        address_id,
        karma,
        task_count,
        avg_rating,
        profile_picture_url,
        acct_created_timestamp
      )
      SELECT
        '${firstName}',
        '${lastName}',
        '${hashPass}',
        '${email}',
        address_id,
        0,
        0,
        null,
        '${imgUrl}',
        (SELECT CURRENT_TIMESTAMP)
      FROM X
      RETURNING
        user_id, firstname, lastname, email, address_id, karma, task_count, avg_rating, profile_picture_url
    `;

    try {
      const testCoord = await getCoordinates(addressQuery);
      coordinate = `point(${testCoord.lng},${testCoord.lat})`;
      const data = await db.query(queryStr);
      return data.rows[0];
    } catch (err) {
      return err;
    }
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
        avg_rating,
        profile_picture_url, (
          SELECT ROW_TO_JSON(add)
          FROM (
            SELECT
              street_address,
              city,
              state,
              zipcode,
              neighborhood
            FROM nexdoor.address
            WHERE address_id=nexdoor.users.address_id
          ) add
        ) as address
      FROM nexdoor.users
      WHERE user_id=${userId};
    `;
    try {
      const data = await db.query(queryStr);
      return data.rows[0];
    } catch (err) {
      return err;
    }
  },

  getUsersByRating: async (params) => {
    const { quantity } = params || 25;
    const queryStr = `
      SELECT
        user_id,
        firstname,
        lastname,
        address_id,
        karma,
        task_count,
        avg_rating,
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
      ORDER BY avg_rating
      LIMIT ${quantity}
    `;
    try {
      const data = db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },

  getUsersInRangeByRating: async (params) => {
    const { userId } = params;
    const { range } = params || 1;
    const { quantity } = params || 25;
    const queryStr = `
      SELECT
        user_id,
        firstname,
        lastname,
        address_id,
        karma,
        task_count,
        avg_rating,
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
      ORDER BY avg_rating
      LIMIT ${quantity}
    `;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },

  checkForEmail: async (body) => {
    const { email } = body;
    const queryStr = `
      SELECT EXISTS (
        SELECT true FROM nexdoor.users
        WHERE email='${email}'
        LIMIT 1
      )
    `;
    try {
      const data = await db.query(queryStr);
      return data.rows[0];
    } catch (err) {
      return err;
    }
  },

  getUserCredentials: async (params) => {
    const { userId } = params;
    const queryStr = `
      SELECT email, password
      FROM nexdoor.users
      WHERE user_id=${userId}
    ;`;
    try {
      const data = await db.query(queryStr);
      return data.rows[0];
    } catch (err) {
      return err;
    }
  },

  authenticateLogin: async ({ email, password }) => {
    const queryStr = `
      SELECT user_id, password
      FROM nexdoor.users
      WHERE email='${email}'
    ;`;
    try {
      const data = await db.query(queryStr);
      const { user_id } = data.rows[0];
      if (!bcrypt.compareSync(password, data.rows[0].password)) {
        return false;
      }
      return user_id;
    } catch (err) {
      return err;
    }
  },
};

module.exports = userControllers;
