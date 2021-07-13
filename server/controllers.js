const db = require('../db/index');

const controllers = {
  // ******************************************************
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
  // ******************************************************
  // ADD TASK WITH NON-HOME ADDRESS
  // POST api/task/new/5
  /* req.body =
  {
    "streetAddress": "111 Random Street",
    "city": "Los Angeles",
    "state": "CA",
    "zipcode": 12345,
    "neighborhood": "Hollywood",
    "description": "Hoping to borrow 2 lawnchairs",
    "carRequired": false,
    "laborRequired": false,
    "category": "borrow",
    "date": "08/10/2021",
    "time": "5:08",
    "dateRequested": "08/10/2021",
    "timeRequested": "11:38",
    "duration": 2
  }
  */
  addTaskNewAddress: (req, res) => {
    const { id } = req.params;
    const {
      streetAddress,
      city,
      state,
      zipcode,
      neighborhood,
      description,
      carRequired,
      laborRequired,
      category,
      date,
      time,
      dateRequested,
      timeRequested,
      duration,
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
      INSERT INTO nexdoor.tasks (
        requester_id,
        location_id,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        date,
        time,
        date_requested,
        time_requested,
        duration
      )
      SELECT
        ${id},
        address_id,
        '${description}',
        ${carRequired},
        ${laborRequired},
        'open',
        '${category}',
        '${date}',
        '${time}',
        '${dateRequested}',
        '${timeRequested}',
        ${duration}
      FROM X;
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  addTaskHomeAddress: (req, res) => {
    const { id } = req.params;

    const {
      description,
      carRequired,
      laborRequired,
      category,
      date,
      time,
      dateRequested,
      timeRequested,
      duration,
    } = req.body;

    const queryStr = `
      INSERT INTO nexdoor.tasks (
        requester_id,
        location_id,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        date,
        time,
        date_requested,
        time_requested,
        duration
      ) VALUES (
        ${id},
        (
          SELECT address_id
          FROM nexdoor.users
          WHERE user_id=${id}
        ),
        '${description}',
        ${carRequired},
        ${laborRequired},
        'open', '${category}',
        '${date}',
        '${time}',
        '${dateRequested}',
        '${timeRequested}',
        ${duration}
      );
    `;

    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data.rows);
      }
    });
  },

  // ******************************************************
  addAnnouncement: (req, res) => {
    const { userId } = req.params;
    const {
      announcementBody,
      date,
      time,
    } = req.body;

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

  checkForEmail: (req, res) => {
    const { email } = req.body;
    const queryStr = `
      SELECT EXISTS (
        SELECT true FROM nexdoor.users
        WHERE email='${email}'
        LIMIT 1
      )
    `;
    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
        // return true;
      } else {
        // return false
        res.status(200).send(data.rows[0].exists);
      }
    });
  },

};

module.exports = controllers;
