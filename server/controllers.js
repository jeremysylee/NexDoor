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
        INSERT INTO nexdoor.address (street_address, city, state, zipcode, neighborhood)
        VALUES ('${streetAddress}', '${city}', '${state}', ${zipcode}, '${neighborhood}')
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
      SELECT '${firstName}', '${lastName}', '${password}', '${email}', address_id, 0, 0, 5, '${imgUrl}'
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
};

module.exports = controllers;
