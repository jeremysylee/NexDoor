const db = require('../db/index');

const controllers = {
  // ******************************************************
  /*
    POST /api/user
      req.body = {
      "streetAddress": "450 Grundle Lane",
      "city": "Los Angeles",
      "state": "CA",
      "zipcode": 87980,
      "neighborhood": "Pasadena",
      "firstName": "George",
      "lastName": "Kentucky",
      "password": "431jkl",
      "email": "georgek@gmail.com",
      "imgUrl": "https://uknow.uky.edu/sites/default/files/styles/uknow_story_image/public/externals/e9e2133396fc318d7b991696e8404c58.jpg"
    }
    res = "User added to db"
  */
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

    db.query(queryStr, (err) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send('User added to db');
      }
    });
  },
  // ******************************************************
  // ADD TASK WITH NON-HOME ADDRESS
  // POST api/task/new/${userId}
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
  res = 'Added task to db'
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

    db.query(queryStr, (err) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send('Added task to db');
      }
    });
  },

  // ******************************************************
  /*
    POST api/task/home/${userId}
    req.body = {
      "description": "Can somebody help me put up a fence please",
      "carRequired": false,
      "laborRequired": true,
      "category": "labor",
      "date": "05/13/2021",
      "time": "10:08",
      "dateRequested": "05/04/2021",
      "timeRequested": "09:08",
      "duration": 1
      }
      res = 'Added task to db'
  */
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

    db.query(queryStr, (err) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send('Added task to db');
      }
    });
  },

  // ******************************************************
  /*
    POST /api/messages/5/3
    req.body = {
      "messageBody": "I\u0027m going out of town",
      "date": "06/13/2021",
      "time": "04:21"
    }
    res = 'Added message to db'
  */
  addMessage: (req, res) => {
    const { taskId, userId } = req.params;
    const { messageBody, date, time } = req.body;
    const queryStr = `
      INSERT INTO nexdoor.messages (
        task_id,
        user_id,
        message_body,
        date,
        time)
      VALUES (
        ${taskId},
        ${userId},
        '${messageBody}',
        '${date}',
        '${time}'
      );
    `;
    db.query(queryStr, (err, data) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send('Added message to db');
      }
    });
  },

  // ******************************************************
  /*
    POST api/announce/${userId}
    req.body = {
      "announcementBody": "There was a robbery at 123 East Main Street last night",
      "date": "10/17/2020",
      "time": "05:25"
    }
    res = 'Added announcement to db'
  */
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
        '${announcementBody}',
        '${date}',
        '${time}'
      )
    `;

    db.query(queryStr, (err) => {
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send('Added announcement to db');
      }
    });
  },

  // ******************************************************
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

  // ******************************************************
  /*
    GET /api/tasks
    [
      {
        "task_id": 1,
        "requester_name": {
            "firstname": "Tom",
            "lastname": "Jones"
        },
        "helper_name": null,
        "location": {
            "street_address": "58901 Chumbly Court",
            "city": "Los Angeles",
            "state": "CA",
            "zipcode": "90005",
            "neighborhood": "Downtown"
        },
        "description": "Need someone to help me move a couch",
        "car_required": true,
        "physical_labor_required": "true",
        "status": "open",
        "category": "labor",
        "date": "2021-02-03T08:00:00.000Z",
        "time": "05:17:00",
        "date_requested": "2021-07-21T07:00:00.000Z",
        "time_requested": "08:41:00",
        "duration": 2
      },
  */
  getTasks: (req, res) => {
    const queryStr = `
      SELECT
        task_id,
        (SELECT ROW_TO_JSON(reqname)
        FROM (
          SELECT firstname, lastname
          FROM nexdoor.users
          WHERE nexdoor.users.user_id=nexdoor.tasks.requester_id
        ) reqname ) AS requester_name,
        (SELECT ROW_TO_JSON(helpname)
        FROM (
          SELECT firstname, lastname
          FROM nexdoor.users
          WHERE nexdoor.users.user_id=nexdoor.tasks.helper_id
        ) helpname ) AS helper_name,
        (SELECT ROW_TO_JSON(loc)
        FROM (
          SELECT street_address, city, state, zipcode, neighborhood
          FROM nexdoor.address
          WHERE address_id=nexdoor.tasks.location_id
        ) loc ) AS location,
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
      FROM nexdoor.tasks
      LIMIT 100;
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
  getMessagesByTask: (req, res) => {
    const { taskId } = req.params;
    const queryStr = `
      SELECT
        firstname,
        lastname,
        message_body,
        date,
        time
      FROM
        nexdoor.messages
      INNER JOIN
        nexdoor.users
        ON nexdoor.users.user_id=nexdoor.messages.user_id
      WHERE
        task_id=${taskId};
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
      // if (err) {
      //   res.status(400).send(err.stack);
      // } else if (data.rows[0].exists) {
      //   res.status(200).send(data.rows[0].exists);
      // } else {
      //   res.status(400).send(false);
      // }
      if (err) {
        res.status(400).send(err.stack);
      } else {
        res.status(200).send(data.rows[0].exists);
      }
    });
  },

};

module.exports = controllers;
