const db = require('../db/index');

const controllers = {
  addUser: (req, res) => {
    const {
      streetAddress,
      city,
      state,
      zipcode,
      neighborhood,
      firstName,
      lastName,
      password,
      email,
      imgUrl,
    } = req.body;

    const queryStr = `
      WITH X AS (
        INSERT INTO nexdoor.address (
          street_address,
          city,
          state,
          zipcode,
          neighborhood
        )
        VALUES (
          '${streetAddress}',
          '${city}',
          '${state}',
          ${zipcode},
          '${neighborhood}'
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
        profile_picture_url
      )
      SELECT
        '${firstName}',
        '${lastName}',
        '${password}',
        '${email}',
        address_id,
        0,
        0,
        null,
        '${imgUrl}'
      FROM X;
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data);
      }
    });
  },

  addAnnouncement: (req, res) => {
    const { userId } = req.params;
    const {
      announcementBody,
      date,
      time,
    } = req.params;

    const queryStr = `
      INSERT INTO nexdoor.announcements (
        user_id,
        announcement_body,
        date,
        time
      )
      VALUES (
        ${userId},
        ${announcementBody},
        ${date},
        ${time}
      )
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  getUser: (req, res) => {
    const { id } = req.params;

    const queryStr = `
      SELECT
        firstname,
        lastname,
        email,
        karma,
        task_count,
        avg_rating,
        profile_picture_url, (
          SELECT JSON_AGG(ROW_TO_JSON(t))
          FROM (
            SELECT
              street_address,
              city,
              state,
              zipcode,
              neighborhood
            FROM nexdoor.address
            WHERE address_id=nexdoor.users.address_id
          ) t
        ) as address
      FROM nexdoor.users
      WHERE user_id=${id};
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

};

module.exports = controllers;
