/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const session = require('express-session');
const db = require('../../db/index');
const getCoordinates = require('./coordinates');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a new user: 15 - 122
- Get user info object: 124 - 186
- Get list of users ordered by highest rating: 188 - 231
- Check if email already exists in db: 233 - 268
- Get a users email and password: 270 - 298
________________________________________________________________*/
const userControllers = {
  addUser: (body) => {
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

    const queryDb = () => {
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

      return db.query(queryStr)
        .then((data) => data.rows[0])
        .catch((err) => err);
    };

    getCoordinates(addressQuery)
      .then((testCoord) => {
        coordinate = `point(${testCoord.lng},${testCoord.lat})`;
      })
      .then(() => {
        queryDb();
      })
      .catch((err) => err);
  },

  getUser: ({ userId }) => {
    console.log(userId, 'asfeioas.__________------>');
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

    return db.query(queryStr)
      .then((data) => data.rows[0])
      .catch((err) => err);
  },

  getUsersByRating: (params) => {
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
    return db.query(queryStr)
      .then((data) => data.rows)
      .catch((err) => err);
  },

  getUsersInRangeByRating: (params) => {
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
    return db.query(queryStr)
      .then((data) => data.rows)
      .catch((err) => err);
  },

  checkForEmail: (body) => {
    const { email } = body;
    const queryStr = `
      SELECT EXISTS (
        SELECT true FROM nexdoor.users
        WHERE email='${email}'
        LIMIT 1
      )
    `;
    return db.query(queryStr)
      .then((data) => data.rows[0].exists)
      .catch((err) => err);
  },

  getUserCredentials: (params) => {
    const { userId } = params;
    const queryStr = `
      SELECT email, password
      FROM nexdoor.users
      WHERE user_id=${userId}
    ;`;
    db.query(queryStr)
      .then((data) => data.rows[0])
      .catch((err) => err);
  },

  authenticateLogin: (req, { email, password }) => {
    const queryStr = `
      SELECT user_id, password
      FROM nexdoor.users
      WHERE email='${email}'
    ;`;
    return db.query(queryStr)
      .then((data) => {
        const { user_id } = data.rows[0];
        //compare passwords
        if (!bcrypt.compareSync(password, data.rows[0].password)) {
          return false;
        }
        req.session.user_id = user_id;
        req.session.save();
        return user_id;
      })
      .catch((err) => {
        req.session.destroy();
        return err;
      });
  },

  authenticateSession: (req, res) => {
    if (req.session.user_id) {
      const { user_id } = req.session.user_id;
      res.status(200).send({ user_id });
    } else {
      res.status(418).send('error: user is a teapot');
    }
  },

};

module.exports = userControllers;

// user_id fk field
// date with timezone - expiry
// only query for dates that have not already passed
