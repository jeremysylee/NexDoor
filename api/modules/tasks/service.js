/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const db = require('../../db/index');
const getCoordinates = require('../coordinates/coordinates');

const taskModels = {

  addTaskNewAddress: async ({
    userId,
    streetAddress,
    city,
    state,
    zipcode,
    neighborhood,
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
  }) => {
    try {
      const coord = await getCoordinates();
      const coordinate = `point(${coord.lng},${coord.lat})`;
      const queryStr = `
          WITH X AS (
            INSERT INTO nexdoor.address
            (
              street_address,
              city,
              state,
              zipcode,
              neighborhood,
              coordinate
            )
            VALUES
            (
              '${streetAddress}',
              '${city}',
              '${state}',
              ${zipcode},
              '${neighborhood}',
              ${coordinate}
            )
          RETURNING address_id
        )
        INSERT INTO nexdoor.tasks (
          requester_id,
          address_id,
          description,
          car_required,
          physical_labor_required,
          status,
          category,
          start_date,
          end_date,
          start_time,
          duration,
          timestamp_requested
        )
        SELECT
          ${userId},
          address_id,
          '${description}',
          ${carRequired},
          ${laborRequired},
          'Open',
          '${category}',
          '${startDate}',
          '${endDate}',
          '${startTime}',
          ${duration},
          (SELECT CURRENT_TIMESTAMP)
        FROM X;
      `;
      await db.query(queryStr);
      return 'added task with new Address';
    } catch (err) {
      return err;
    }
  },

  addTaskHomeAddress: async ({
    userId,
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
  }) => {
    try {
      const queryStr = `
      INSERT INTO nexdoor.tasks (
        requester_id,
        address_id,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        start_date,
        end_date,
        start_time,
        duration,
        timestamp_requested
        ) VALUES (
          ${userId},
          (
            SELECT address_id
            FROM nexdoor.users
            WHERE user_id=${userId}
            ),
            '${description}',
            ${carRequired},
            ${laborRequired},
            'Open',
            '${category}',
            '${startDate}',
            '${endDate}',
            '${startTime}',
            ${duration},
            (SELECT CURRENT_TIMESTAMP)
            );
            `;
      await db.query(queryStr);
      return 'Added task to db';
    } catch (err) {
      return err;
    }
  },

  addTaskExistingAddress: async ({
    userId,
    addressId,
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
  }) => {
    try {
      const queryStr = `
      INSERT INTO nexdoor.tasks (
        requester_id,
        address_id,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        start_date,
        end_date,
        start_time,
        duration,
        timestamp_requested
      )
      VALUES (
        ${userId},
        ${addressId},
        '${description}',
        ${carRequired},
        ${laborRequired},
        'Open',
        '${category}',
        '${startDate}',
        '${endDate}',
        '${startTime}',
        ${duration},
        (SELECT CURRENT_TIMESTAMP)
      )
    `;
      await db.query(queryStr);
      return 'added task with existing address';
    } catch (err) {
      return err;
    }
  },

  // addTaskCheckAddress: (req, res) => {
  //   const { userId } = req.params;
  //   const {
  //     streetAddress,
  //     city,
  //     state,
  //     zipcode,
  //     neighborhood,
  //     description,
  //     carRequired,
  //     laborRequired,
  //     category,
  //     startDate,
  //     endDate,
  //     startTime,
  //     duration,
  //   } = req.body;

  //   const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
  //   let coordinate;

  //   const queryStr1 = `
  //     SELECT address_id
  //     FROM nexdoor.address
  //     WHERE street_address='${streetAddress}'
  //     AND zipcode=${zipcode}
  //   `;

  //   const queryDb = () => {
  //     const queryStr3 = `
  //       WITH X AS (
  //         INSERT INTO nexdoor.address
  //         (
  //           street_address,
  //           city,
  //           state,
  //           zipcode,
  //           neighborhood,
  //           coordinate
  //         )
  //         VALUES
  //         (
  //           '${streetAddress}',
  //           '${city}',
  //           '${state}',
  //           ${zipcode},
  //           '${neighborhood}',
  //           ${coordinate}
  //         )
  //       RETURNING address_id
  //     )
  //     INSERT INTO nexdoor.tasks (
  //       requester_id,
  //       address_id,
  //       description,
  //       car_required,
  //       physical_labor_required,
  //       status,
  //       category,
  //       start_date,
  //       end_date,
  //       start_time,
  //       duration,
  //       timestamp_requested
  //     )
  //     SELECT
  //       ${userId},
  //       address_id,
  //       '${description}',
  //       ${carRequired},
  //       ${laborRequired},
  //       'Open',
  //       '${category}',
  //       '${startDate}',
  //       '${endDate}',
  //       '${startTime}',
  //       ${duration},
  //       (SELECT CURRENT_TIMESTAMP)
  //     FROM X;
  //   `;

  //     db.query(queryStr3)
  //       .then(() => {
  //         res.send('Added task with new address to db');
  //       })
  //       .catch((err) => {
  //         res.status(400).send(err.stack);
  //       });
  //   };

  //   db.query(queryStr1)
  //     .then((address) => {
  //       if (address.rows.length > 0) {
  //         const addressId = address.rows[0].address_id;
  //          const queryStr2 = `
  //         INSERT INTO nexdoor.tasks (
  //           requester_id,
  //           address_id,
  //           description,
  //          car_required,
  //           physical_labor_required,
  //           status,
  //           category,
  //           start_date,
  //           end_date,
  //           start_time,
  //           duration,
  //           timestamp_requested
  //         )
  //         VALUES (
  //           ${userId},
  //           ${addressId},
  //           '${description}',
  //           ${carRequired},
  //           ${laborRequired},
  //           'Open',
  //           '${category}',
  //           '${startDate}',
  //           '${endDate}',
  //           '${startTime}',
  //           ${duration},
  //           (SELECT CURRENT_TIMESTAMP)
  //         )
  //       `;
  //         db.query(queryStr2)
  //           .then(() => {
  //             res.status(200).send('Added task with old address to db');
  //           })
  //           .catch((err) => {
  //             res.status(400).send(err.stack);
  //           });
  //       } else {
  //         getCoordinates(addressQuery)
  //           .then((testCoord) => {
  //             coordinate = `point(${testCoord.lng},${testCoord.lat})`;
  //           })
  //           .then(() => {
  //             queryDb();
  //           })
  //           .catch((err) => {
  //             res.status(400).send('Error getting coordinates', err.stack);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(400).send('error', err.stack);
  //     });
  // },

  checkForAddress: async ({ streetAddress, zipcode }) => {
    try {
      const queryStr = `
        SELECT address_id
        FROM nexdoor.address
        WHERE street_address='${streetAddress}'
        AND zipcode=${zipcode}
      `;
      const address = await db.query(queryStr);
      return address;
    } catch (err) {
      return err;
    }
  },

  // *************************************************************

  // *************************************************************
  // GET X # OF TASKS
  // *************************************************************
  //   Needs from Front End - none
  //   Returns - array of task objects, ordered by start date and start time
  // *************************************************************
  /*
    GET /api/tasks/:userId/:quantity/:offset
    [
      {
        "task_id": 12,
        "requester": {
            "user_id": 16,
            "firstname": "Franklin",
            "lastname": "Doogan",
            "email": "fdoog@gmail.com",
            "address_id": 41,
            "karma": 5,
            "task_count": 15,
            "avg_rating": 4,
            "profile_picture_url": "https://www.indiewire.com/wp-content/uploads/2017/06/0000246240.jpg"
        },
        "helper": {
            "user_id": 17,
            "firstname": "Jenny",
            "lastname": "Cho",
            "email": "questionmaster3000@gmail.com",
            "address_id": 42,
            "karma": 64,
            "task_count": 28,
            "avg_rating": 5,
            "profile_picture_url": "https://media-exp1.licdn.com/dms/image/C5603AQEVw__BKGBOdw/profile-displayphoto-shrink_200_200/0/1551395086203?e=1631750400&v=beta&t=yMuQBb8y5FTMWUZfBUKUFvACe8Mbv5z_8aaCAQxaSH0"
        },
        "location": {
            "address_id": 43,
            "street_address": "8837 Rangely Ave",
            "city": "West Hollywood",
            "state": "CA",
            "zipcode": 90048,
            "neighborhood": "West Hollywood",
            "coordinate": "(-118.386255,34.080076)"
        },
        "description": "GIVE ME BUTTER NOW",
        "car_required": null,
        "physical_labor_required": null,
        "status": "pending",
        "category": "borrow",
        "start_date": "2021-08-13T07:00:00.000Z",
        "end_date": "2021-08-20T07:00:00.000Z",
        "start_time": "01:30:00",
        "duration": 2,
        "timestamp_requested": "2021-07-14T09:35:09.135Z"
    },
    ]
  */
  // *************************************************************
  getTasks: async ({
    userId, quantity, offset,
  }) => {
    const queryStr = `
    SELECT ROW_TO_JSON(all)
    FROM (
      SELECT
          task_id,
          (
            SELECT ROW_TO_JSON(reqname)
            FROM (
              SELECT
                user_id,
                firstname,
                lastname,
                email,
                address_id,
                karma,
                task_count,
                avg_rating,
                profile_picture_url
              FROM nexdoor.users
              WHERE user_id=nexdoor.tasks.requester_id
            ) reqname
          ) as requester,
          (
            SELECT ROW_TO_JSON(helpname)
            FROM (
              SELECT
                user_id,
                firstname,
                lastname,
                email,
                address_id,
                karma,
                task_count,
                avg_rating,
                profile_picture_url
              FROM nexdoor.users
              WHERE user_id=nexdoor.tasks.helper_id
            ) helpname
          ) AS helper,
          (
            SELECT ROW_TO_JSON(loc)
            FROM (
              SELECT *
              FROM nexdoor.address
              WHERE address_id=nexdoor.tasks.address_id
            ) loc
          ) AS location,
          description,
          car_required,
          physical_labor_required,
          status,
          category,
          start_date,
          end_date,
          start_time,
          duration,
          timestamp_requested
        FROM nexdoor.tasks
        WHERE
          requester_id != ${userId} AND
          (
            helper_id != ${userId} OR
            helper_id IS NULL
          )
        ORDER BY
          start_date,
          start_time
        LIMIT ${quantity}
        OFFSET ${offset}
      ) all
    ) as all
    ;`;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // GET TASKS IN RANGE
  // *************************************************************
  //   Needs from Front End - UserId(int), Range(in miles)(int or float)
  //   Return - Array of task objects, each returned task object falls within
  //     the given range in miles from the given userId's home address, array is sorted
  //     by starting date and time
  // *************************************************************
  /*
    GET /api/tasks/:userId/:range(in miles)
    req.body = none
    res =
      [
        {
          "task_id": 14,
          "requester": {
              "user_id": 16,
              "firstname": "Franklin",
              "lastname": "Doogan",
              "email": "fdoog@gmail.com",
              "address_id": 41,
              "karma": 5,
              "task_count": 15,
              "avg_rating": 4,
              "profile_picture_url": "https://www.indiewire.com/wp-content/uploads/2017/06/0000246240.jpg"
          },
          "helper": {
              "user_id": 17,
              "firstname": "Jenny",
              "lastname": "Cho",
              "email": "questionmaster3000@gmail.com",
              "address_id": 42,
              "karma": 64,
              "task_count": 28,
              "avg_rating": 5,
              "profile_picture_url": "https://media-exp1.licdn.com/dms/image/C5603AQEVw__BKGBOdw/profile-displayphoto-shrink_200_200/0/1551395086203?e=1631750400&v=beta&t=yMuQBb8y5FTMWUZfBUKUFvACe8Mbv5z_8aaCAQxaSH0"
          },
          "address": {
              "address_id": 41,
              "street_address": "8906 Dorrington Ave",
              "city": "Los Angeles",
              "state": "CA",
              "zipcode": 90048,
              "neighborhood": "West Hollywood",
              "coordinate": "(-118.386511,34.079391)"
          },
          "description": "help me with life",
          "car_required": false,
          "physical_labor_required": "false",
          "status": "open",
          "category": "favor",
          "start_date": "2021-07-21T07:00:00.000Z",
          "end_date": "2021-07-24T07:00:00.000Z",
          "start_time": "12:00:00",
          "duration": 4,
          "timestamp_requested": "2021-07-15T02:40:51.331Z"
      },
      .......
    ]
  */
  // *************************************************************
  getTasksInRange: async ({
    userId, range,
  }) => {
    const queryStr = `
      SELECT
        task_id,
        (
          SELECT ROW_TO_JSON(reqname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=nexdoor.tasks.requester_id
          ) reqname
        ) as requester,
        (
          SELECT ROW_TO_JSON(helpname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=nexdoor.tasks.helper_id
          ) helpname
        ) AS helper,
        (
          SELECT ROW_TO_JSON(loc)
          FROM (
            SELECT *
            FROM nexdoor.address
            WHERE address_id=nexdoor.tasks.address_id
          ) loc
        ) AS address,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        start_date,
        end_date,
        start_time,
        duration,
        timestamp_requested
      FROM nexdoor.tasks
      WHERE (
        (
          SELECT coordinate
          FROM nexdoor.address
          WHERE address_id=nexdoor.tasks.address_id
        )
        <@>
        (
          SELECT coordinate
          FROM nexdoor.address
          WHERE address_id=
            (
              SELECT address_id
              FROM nexdoor.users
              WHERE user_id=${userId}
            )
          ) < ${range}
        )
      ORDER BY
        start_date,
        start_time
      LIMIT 100;
    `;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // GET TASKS IN RANGE FOR INPUT ADDRESS
  // *************************************************************
  // Needs from Front End - userId, range (in miles), street address, city, state, zipcode, neighborhood (optional)
  // Return - array of tasks objects
  // Note - does not create a new entry in the address table for the input address
  // *************************************************************
  /*
    GET /api/tasks/alt/:range
    req.body =
      {
        "streetAddress": "1154 Glendale Blvd",
        "city": "Los Angeles",
        "state": "CA",
        "zipcode": 90026,
        "neighborhood": "Echo Park"
      }
    res =
      [
        {
          "task_id": 40,
          "requester": {
              "user_id": 43,
              "firstname": "Adam",
              "lastname": "Croggins",
              "email": "acroggins@gmail.com",
              "address_id": 78,
              "karma": 0,
              "task_count": 0,
              "avg_rating": null,
              "profile_picture_url": "https://yt3.ggpht.com/ytc/AKedOLS9pqgIqwr8DKFtTl2FrNxCOAa7z7pjvWcAL7Jupw=s900-c-k-c0x00ffffff-no-rj"
          },
          "helper": {
              "user_id": 41,
              "firstname": "Cheryl",
              "lastname": "Monstera",
              "email": "cmonst@gmail.com",
              "address_id": 76,
              "karma": 0,
              "task_count": 0,
              "avg_rating": null,
              "profile_picture_url": "https://upload.wikimedia.org/wikipedia/commons/0/01/Cheryl_Cole_Cannes_2014.jpg"
          },
          "address": {
              "address_id": 78,
              "street_address": "1822 Sunset Blvd",
              "city": "Los Angeles",
              "state": "CA",
              "zipcode": 90026,
              "neighborhood": "Echo Park",
              "coordinate": "(-118.260108,34.0777287)"
          },
          "description": "Looking to trade an old set of golf clubs for an equally prized heirloom",
          "car_required": true,
          "physical_labor_required": "false",
          "status": "Pending",
          "category": "Favor",
          "start_date": "2021-02-01T08:00:00.000Z",
          "end_date": "2021-02-01T08:00:00.000Z",
          "start_time": "11:00:00",
          "duration": 1,
          "timestamp_requested": "2021-07-15T09:42:29.051Z"
        },
        ....
      ]
  */
  // *************************************************************
  getTasksInRangeAltAddress: async ({
    range,
    streetAddress,
    city,
    state,
    zipcode,
  }) => {
    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    let coordinate;
    try {
      const testCoord = await getCoordinates(addressQuery);
      coordinate = `point(${testCoord.lng},${testCoord.lat})`;

      const queryStr = `
        SELECT
          task_id,
          (
            SELECT ROW_TO_JSON(reqname)
            FROM (
              SELECT
                user_id,
                firstname,
                lastname,
                email,
                address_id,
                karma,
                task_count,
                avg_rating,
                profile_picture_url
              FROM nexdoor.users
              WHERE user_id=nexdoor.tasks.requester_id
            ) reqname
          ) as requester,
          (
            SELECT ROW_TO_JSON(helpname)
            FROM (
              SELECT
                user_id,
                firstname,
                lastname,
                email,
                address_id,
                karma,
                task_count,
                avg_rating,
                profile_picture_url
              FROM nexdoor.users
              WHERE user_id=nexdoor.tasks.helper_id
            ) helpname
          ) AS helper,
          (
            SELECT ROW_TO_JSON(loc)
            FROM (
              SELECT *
              FROM nexdoor.address
              WHERE address_id=nexdoor.tasks.address_id
            ) loc
          ) AS address,
          description,
          car_required,
          physical_labor_required,
          status,
          category,
          start_date,
          end_date,
          start_time,
          duration,
          timestamp_requested
        FROM nexdoor.tasks
        WHERE (
          (
            SELECT coordinate
            FROM nexdoor.address
            WHERE address_id=nexdoor.tasks.address_id
          )
          <@>
          (${coordinate})
        ) < ${range}
        ORDER BY
          start_date,
          start_time
        LIMIT 100;
      ;`;

      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // GET REQUESTED TASKS BY USER ID
  // *************************************************************
  // Needs from Front End - userId
  // Returns - array of task objects where given user is the requester, ordered by date/time
  // *************************************************************
  /*
    GET /api/tasks/req/:userID
    req.body = none
    res =
      [
        {
          {
            "task_id": 10,
            "requester": {
              "user_id": 16,
              "firstname": "Franklin",
              "lastname": "Doogan",
              "email": "fdoog@gmail.com",
              "address_id": 41,
              "karma": 5,
              "task_count": 15,
              "avg_rating": 4,
              "profile_picture_url": "https://www.indiewire.com/wp-content/uploads/2017/06/0000246240.jpg"
          },
          "helper": null,
          "location": {
              "address_id": 41,
              "street_address": "8906 Dorrington Ave",
              "city": "Los Angeles",
              "state": "CA",
              "zipcode": 90048,
              "neighborhood": "West Hollywood",
              "coordinate": "(-118.386511,34.079391)"
          },
          "description": "Help me with my tiny cats",
          "car_required": null,
          "physical_labor_required": null,
          "status": "open",
          "category": "sitting",
          "start_date": "2021-06-21T07:00:00.000Z",
          "end_date": "2021-06-23T07:00:00.000Z",
          "start_time": "04:20:00",
          "duration": 4,
          "timestamp_requested": "2021-07-14T09:28:58.050Z"
          },
        },
        .....
      ]
  */
  // *************************************************************
  getReqTasksByUser: async ({ userId }) => {
    const queryStr = `
      SELECT
        task_id,
        (
          SELECT ROW_TO_JSON(reqname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=${userId}
          ) reqname
        ) as requester,
        (
          SELECT ROW_TO_JSON(helpname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=nexdoor.tasks.helper_id
          ) helpname
        ) as helper,
        (
          SELECT ROW_TO_JSON(loc)
          FROM (
            SELECT *
            FROM nexdoor.address
            WHERE address_id=nexdoor.tasks.address_id
          ) loc
        ) as location,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        start_date,
        end_date,
        start_time,
        duration,
        timestamp_requested
      FROM nexdoor.tasks
      WHERE requester_id=${userId}
      ORDER BY
        start_date,
        start_time
    ;`;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // GET HELP TASKS BY USER
  // *************************************************************
  // Needs from Front End - userId
  // Returns - array of task objects where the given user is assigned to be a helper, ordered by date/time
  // *************************************************************
  /*
    GET /api/tasks/help/:userId
    req.body = none
    res =
      [
        {
          "task_id": 17,
          "requester": {
              "user_id": 16,
              "firstname": "Franklin",
              "lastname": "Doogan",
              "email": "fdoog@gmail.com",
              "address_id": 41,
              "karma": 5,
              "task_count": 15,
              "avg_rating": 4,
              "profile_picture_url": "https://www.indiewire.com/wp-content/uploads/2017/06/0000246240.jpg"
          },
          "helper": {
              "user_id": 17,
              "firstname": "Jenny",
              "lastname": "Cho",
              "email": "questionmaster3000@gmail.com",
              "address_id": 42,
              "karma": 64,
              "task_count": 28,
              "avg_rating": 5,
              "profile_picture_url": "https://media-exp1.licdn.com/dms/image/C5603AQEVw__BKGBOdw/profile-displayphoto-shrink_200_200/0/1551395086203?e=1631750400&v=beta&t=yMuQBb8y5FTMWUZfBUKUFvACe8Mbv5z_8aaCAQxaSH0"
          },
          "location": {
              "address_id": 48,
              "street_address": "85 Bronson",
              "city": "Los Angeles",
              "state": "CA",
              "zipcode": 90027,
              "neighborhood": "Glendale",
              "coordinate": null
          },
          "description": "help me with my 17 turtles",
          "car_required": false,
          "physical_labor_required": "true",
          "status": "active",
          "category": "favor",
          "start_date": "2021-04-11T07:00:00.000Z",
          "end_date": "2021-04-22T07:00:00.000Z",
          "start_time": "11:00:00",
          "duration": 3,
          "timestamp_requested": "2021-07-15T02:57:56.885Z"
        },
        ....
      ]
  */
  // *************************************************************
  getHelpTasksByUser: async ({ userId }) => {
    const queryStr = `
      SELECT
        task_id,
        (
          SELECT ROW_TO_JSON(reqname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=nexdoor.tasks.requester_id
          ) reqname
        ) AS requester,
        (
          SELECT ROW_TO_JSON(helpname)
          FROM (
            SELECT
              user_id,
              firstname,
              lastname,
              email,
              address_id,
              karma,
              task_count,
              avg_rating,
              profile_picture_url
            FROM nexdoor.users
            WHERE user_id=nexdoor.tasks.helper_id
          ) helpname
        ) AS helper,
        (
          SELECT ROW_TO_JSON(loc)
          FROM (
            SELECT *
            FROM nexdoor.address
            WHERE address_id=nexdoor.tasks.address_id
          ) loc
        ) AS location,
        description,
        car_required,
        physical_labor_required,
        status,
        category,
        start_date,
        end_date,
        start_time,
        duration,
        timestamp_requested
      FROM nexdoor.tasks
      WHERE helper_id=${userId}
      ORDER BY
        start_date,
        start_time
      `;
    try {
      const data = await db.query(queryStr);
      return data.rows;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // UPDATE TASK HELPER AND STATUS
  // *************************************************************
  // Needs from Front End - userId (helper), taskId
  // Returns - String confirmation
  // *************************************************************
  /*
    PUT /task/help/:taskId/:userId
    req.body = none
    res = 'Updated helper, status pending'
  */
  // *************************************************************
  updateHelper: async ({
    taskId,
    userId,
  }) => {
    const queryStr = `
      UPDATE nexdoor.tasks
      SET
        helper_id=${userId},
        status='Pending'
      WHERE task_id=${taskId}
    `;
    try {
      await db.query(queryStr);
      return 'Updated helper, status pending';
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // REMOVE HELPER FROM PENDING TASK
  // *************************************************************
  // Needs from Front End - taskId
  // Return - string confirmation
  // *************************************************************
  /*
    PUT /task/rmhelp/:taskId
    req.body = none
    res = 'Removed helper, status open
  */
  // *************************************************************
  removeHelper: async ({ taskId }) => {
    const queryStr = `
      UPDATE nexdoor.tasks
      SET
        helper_id=null,
        status='Open'
      WHERE task_id=${taskId}
    ;`;
    try {
      await db.query(queryStr);
      return 'Removed helper, status open';
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // CHANGE TASK STATUS TO ACTIVE, COMPLETED
  // *************************************************************
  // Needs from Front End - status(active, completed) taskId
  // Returns - String confirmation
  // *************************************************************
  /*
    PUT /task/change/:status/:taskId
    req.body = none
    res = 'Task 17 status set to complete'
  */
  // *************************************************************
  changeTaskStatus: async ({ status, taskId }) => {
    const queryStr = `
      UPDATE nexdoor.tasks
      SET status='${status}'
      WHERE task_id=${taskId}
    ;`;
    try {
      await db.query(queryStr);
      return `Task ${taskId} status set to ${status}`;
    } catch (err) {
      return err;
    }
  },
  // *************************************************************

  // *************************************************************
  // CLOSE TASK (AND INCREMENT HELPER TASK COUNT / RATING)
  // *************************************************************
  // Needs from Front End - taskId, helper rating
  // Returns - String confirmation
  // Notes - Changes task status to 'Closed', increments helper task count by 1, increments karma by the input rating, calculates and updates new avg rating
  // *************************************************************
  /*
    PUT /task/close/:taskId/:rating
    req.body =
      {
        "review": "Best couch carrying help I have ever received in my life."
      }
    res = 'Task 17 closed'
  */
  // *************************************************************
  closeTask: async ({
    taskId,
    rating,
    review,
  }) => {
    const queryStr1 = `
      UPDATE nexdoor.users
        SET
          task_count=task_count + 1,
          karma=karma + ${rating}
        WHERE user_id=(
          SELECT helper_id
          FROM nexdoor.tasks
          WHERE task_id=${taskId}
        )
    ;`;
    const queryStr2 = `
      UPDATE nexdoor.users
      SET avg_rating=karma / task_count
      WHERE user_id=(
        SELECT helper_id
        FROM nexdoor.tasks
        WHERE task_id=${taskId}
      )
    ;`;
    const queryStr3 = `
      UPDATE nexdoor.tasks
      SET status='Closed'
      WHERE task_id=${taskId}
    ;`;
    const queryStr4 = `
      INSERT INTO nexdoor.reviews (
        rating,
        review,
        requester_id,
        helper_id
      )
      VALUES (
        ${rating},
        '${review}',
        (
          SELECT requester_id
          FROM nexdoor.tasks
          WHERE task_id=${taskId}
        ),
        (
          SELECT helper_id
          FROM nexdoor.tasks
          WHERE task_id=${taskId}
        )
      )
    ;`;
    try {
      await db.query(queryStr1);
      await db.query(queryStr2);
      await db.query(queryStr3);
      await db.query(queryStr4);
      return `Task ${taskId} closed`;
    } catch (err) {
      return err;
    }
  },

  // *************************************************************
  // DELETE TASK FROM DB
  // *************************************************************
  // Needs from Front End - taskId
  // Returns - String confirmation
  // *************************************************************
  /*
    DELETE /task/:taskId
    req.body - none
    res - 'Deleted task 17 from db'
  */
  // *************************************************************
  deleteTask: async ({ taskId }) => {
    const queryStr = `
      DELETE FROM nexdoor.tasks
      WHERE task_id=${taskId}
    ;`;
    try {
      await db.query(queryStr);
      return `Deleted task ${taskId} from db`;
    } catch (err) {
      return err;
    }
  },

  // *************************************************************
  // GET ALL TASKS WITHIN A MILEAGE RANGE FOR A USER AT THEIR HOME ADDRESS (HELPER TASKS, REQUESTER TASKS, ALL OTHER TASKS)
  // *************************************************************
  // Needs from Front End - userId, range (in miles), quantity, offset (quantity and offset only apply to 'all other tasks')
  // Returns - gigantic tasks object with keys for requested, helper, and all other which all hold arrays of task objects
  // *************************************************************
  /*
    res =
      {
    "requested": [
        {
            "task_id": 35,
            "requester": {
                "user_id": 35,
                "firstname": "Frank",
                "lastname": "Putnam",
                "email": "fput@gmail.com",
                "address_id": 70,
                "karma": 0,
                "task_count": 0,
                "avg_rating": null,
                "profile_picture_url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Frank_Welker_Photo_Op_GalaxyCon_Richmond_2020.jpg"
            },
            "helper": {
                "user_id": 36,
                "firstname": "Erika",
                "lastname": "Chumbles",
                "email": "echumbles@gmail.com",
                "address_id": 71,
                "karma": 0,
                "task_count": 0,
                "avg_rating": null,
                "profile_picture_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Erika_Eleniak_2011.jpg"
            },
            "address": {
                "address_id": 70,
                "street_address": "111 S Grand Ave",
                "city": "Los Angeles",
                "state": "CA",
                "zipcode": 90012,
                "neighborhood": "Downtown",
                "coordinate": "(-118.2494494,34.0553077)"
            },
            "description": "I need someone to come check on my dogs once a day for the next three days. They are very friendly. Two small poodles, hypoallergenic, about 20 pounds each. Just need somone to make sure their water bowls are filled. Thank you guys!",
            "car_required": true,
            "physical_labor_required": "false",
            "status": "Complete",
            "category": "Sitting",
            "start_date": "2021-05-13",
            "end_date": "2021-05-16",
            "start_time": "11:00:00",
            "duration": 24,
            "timestamp_requested": "2021-07-15T02:42:29.0272"
        },
        ......
    ],
    "helper": Same as above (array of task objects),
    "allothers": Same as above (array of task objects)
    }
  */
  getTasksMasterDefaultAddress: async ({
    userId,
    range,
    quantity,
    offset,
  }) => {
    const queryStr = `
      SELECT
        (
          SELECT ARRAY_TO_JSON(ARRAY_AGG(req))
          FROM (
            SELECT
              task_id,
              (
                SELECT ROW_TO_JSON(reqname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.requester_id
                ) reqname
              ) as requester,
              (
                SELECT ROW_TO_JSON(helpname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.helper_id
                ) helpname
              ) as helper,
              (
                SELECT ROW_TO_JSON(loc)
                FROM (
                  SELECT *
                  FROM nexdoor.address
                  WHERE address_id=nexdoor.tasks.address_id
                ) loc
              ) as location,
              description,
              car_required,
              physical_labor_required,
              status,
              category,
              start_date,
              end_date,
              start_time,
              duration,
              timestamp_requested
            FROM nexdoor.tasks
            WHERE requester_id=${userId}
            AND (
              (
                SELECT coordinate
                FROM nexdoor.address
                WHERE address_id=nexdoor.tasks.address_id
              )
              <@>
              (
                SELECT coordinate
                FROM nexdoor.address
                WHERE address_id=
                  (
                    SELECT address_id
                    FROM nexdoor.users
                    WHERE user_id=${userId}
                  )
                ) < ${range}
              )
            ORDER BY
              start_date,
              start_time
          ) req
        ) AS requested,
        (
          SELECT ARRAY_TO_JSON(ARRAY_AGG(help))
          FROM (
            SELECT
              task_id,
              (
                SELECT ROW_TO_JSON(reqname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.requester_id
                ) reqname
              ) AS requester,
              (
                SELECT ROW_TO_JSON(helpname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.helper_id
                ) helpname
              ) AS helper,
              (
                SELECT ROW_TO_JSON(loc)
                FROM (
                  SELECT *
                  FROM nexdoor.address
                  WHERE address_id=nexdoor.tasks.address_id
                ) loc
              ) AS location,
              description,
              car_required,
              physical_labor_required,
              status,
              category,
              start_date,
              end_date,
              start_time,
              duration,
              timestamp_requested
            FROM nexdoor.tasks
            WHERE helper_id=${userId} AND (
              (
                SELECT coordinate
                FROM nexdoor.address
                WHERE address_id=nexdoor.tasks.address_id
              )
              <@>
              (
                SELECT coordinate
                FROM nexdoor.address
                WHERE address_id=
                  (
                    SELECT address_id
                    FROM nexdoor.users
                    WHERE user_id=${userId}
                  )
                ) < ${range}
              )
            ORDER BY
              start_date,
              start_time
          ) help
        ) as helper,
        (
          SELECT array_to_json(array_agg(allothers))
          FROM (
            SELECT
                task_id,
                (
                  SELECT ROW_TO_JSON(reqname)
                  FROM (
                    SELECT
                      user_id,
                      firstname,
                      lastname,
                      email,
                      address_id,
                      karma,
                      task_count,
                      avg_rating,
                      profile_picture_url
                    FROM nexdoor.users
                    WHERE user_id=nexdoor.tasks.requester_id
                  ) reqname
                ) as requester,
                (
                  SELECT ROW_TO_JSON(helpname)
                  FROM (
                    SELECT
                      user_id,
                      firstname,
                      lastname,
                      email,
                      address_id,
                      karma,
                      task_count,
                      avg_rating,
                      profile_picture_url
                    FROM nexdoor.users
                    WHERE user_id=nexdoor.tasks.helper_id
                  ) helpname
                ) AS helper,
                (
                  SELECT ROW_TO_JSON(loc)
                  FROM (
                    SELECT *
                    FROM nexdoor.address
                    WHERE address_id=nexdoor.tasks.address_id
                  ) loc
                ) AS location,
                description,
                car_required,
                physical_labor_required,
                status,
                category,
                start_date,
                end_date,
                start_time,
                duration,
                timestamp_requested
              FROM nexdoor.tasks
              WHERE
                (requester_id != ${userId} AND
                (
                  helper_id != ${userId} OR
                  helper_id IS NULL
                )) AND (
                  (
                    SELECT coordinate
                    FROM nexdoor.address
                    WHERE address_id=nexdoor.tasks.address_id
                  )
                  <@>
                  (
                    SELECT coordinate
                    FROM nexdoor.address
                    WHERE address_id=
                      (
                        SELECT address_id
                        FROM nexdoor.users
                        WHERE user_id=${userId}
                      )
                    ) < ${range}
                  )
              ORDER BY
                start_date,
                start_time
              LIMIT ${quantity}
              OFFSET ${offset}
          ) allothers
        ) as allothers
      ;`;
    try {
      const data = await db.query(queryStr);
      return data.rows[0];
    } catch (err) {
      return err;
    }
  },

  // *************************************************************
  // GET ALL TASKS WITHIN A MILEAGE RANGE FOR A USER AT AN ALTERNATE ADDRESS (HELPER TASKS, REQUESTER TASKS, ALL OTHER TASKS)
  // *************************************************************
  // Needs from Front End - userId, range (in miles), quantity, offset (quantity and offset only apply to 'all other tasks'), alternate address info
  // Returns - gigantic tasks object with keys for requested, helper, and all other which all hold arrays of task objects
  // *************************************************************
  getTasksMasterAltAddress: async ({
    userId,
    range,
    quantity,
    offset,
    streetAddress,
    city,
    state,
    zipcode,
  }) => {
    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    let coordinate;
    const queryStr = `
    SELECT
      (
        SELECT ARRAY_TO_JSON(ARRAY_AGG(req))
        FROM (
          SELECT
            task_id,
            (
              SELECT ROW_TO_JSON(reqname)
              FROM (
                SELECT
                  user_id,
                  firstname,
                  lastname,
                  email,
                  address_id,
                  karma,
                  task_count,
                  avg_rating,
                  profile_picture_url
                FROM nexdoor.users
                WHERE user_id=nexdoor.tasks.requester_id
              ) reqname
            ) as requester,
            (
              SELECT ROW_TO_JSON(helpname)
              FROM (
                SELECT
                  user_id,
                  firstname,
                  lastname,
                  email,
                  address_id,
                  karma,
                  task_count,
                  avg_rating,
                  profile_picture_url
                FROM nexdoor.users
                WHERE user_id=nexdoor.tasks.helper_id
              ) helpname
            ) as helper,
            (
              SELECT ROW_TO_JSON(loc)
              FROM (
                SELECT *
                FROM nexdoor.address
                WHERE address_id=nexdoor.tasks.address_id
              ) loc
            ) as location,
            description,
            car_required,
            physical_labor_required,
            status,
            category,
            start_date,
            end_date,
            start_time,
            duration,
            timestamp_requested
          FROM nexdoor.tasks
          WHERE requester_id=${userId} AND ((
            (
              SELECT coordinate
              FROM nexdoor.address
              WHERE address_id=nexdoor.tasks.address_id
            )
            <@>
            (${coordinate})
              ) < ${range}
            )
          ORDER BY
            start_date,
            start_time
        ) req
      ) AS requested,
      (
        SELECT ARRAY_TO_JSON(ARRAY_AGG(help))
        FROM (
          SELECT
            task_id,
            (
              SELECT ROW_TO_JSON(reqname)
              FROM (
                SELECT
                  user_id,
                  firstname,
                  lastname,
                  email,
                  address_id,
                  karma,
                  task_count,
                  avg_rating,
                  profile_picture_url
                FROM nexdoor.users
                WHERE user_id=nexdoor.tasks.requester_id
              ) reqname
            ) AS requester,
            (
              SELECT ROW_TO_JSON(helpname)
              FROM (
                SELECT
                  user_id,
                  firstname,
                  lastname,
                  email,
                  address_id,
                  karma,
                  task_count,
                  avg_rating,
                  profile_picture_url
                FROM nexdoor.users
                WHERE user_id=nexdoor.tasks.helper_id
              ) helpname
            ) AS helper,
            (
              SELECT ROW_TO_JSON(loc)
              FROM (
                SELECT *
                FROM nexdoor.address
                WHERE address_id=nexdoor.tasks.address_id
              ) loc
            ) AS location,
            description,
            car_required,
            physical_labor_required,
            status,
            category,
            start_date,
            end_date,
            start_time,
            duration,
            timestamp_requested
          FROM nexdoor.tasks
          WHERE helper_id=${userId} AND ((
            (
              SELECT coordinate
              FROM nexdoor.address
              WHERE address_id=nexdoor.tasks.address_id
            )
            <@>
            (${coordinate})
              ) < ${range}
            )
          ORDER BY
            start_date,
            start_time
        ) help
      ) as helper,
      (
        SELECT array_to_json(array_agg(allothers))
        FROM (
          SELECT
              task_id,
              (
                SELECT ROW_TO_JSON(reqname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.requester_id
                ) reqname
              ) as requester,
              (
                SELECT ROW_TO_JSON(helpname)
                FROM (
                  SELECT
                    user_id,
                    firstname,
                    lastname,
                    email,
                    address_id,
                    karma,
                    task_count,
                    avg_rating,
                    profile_picture_url
                  FROM nexdoor.users
                  WHERE user_id=nexdoor.tasks.helper_id
                ) helpname
              ) AS helper,
              (
                SELECT ROW_TO_JSON(loc)
                FROM (
                  SELECT *
                  FROM nexdoor.address
                  WHERE address_id=nexdoor.tasks.address_id
                ) loc
              ) AS location,
              description,
              car_required,
              physical_labor_required,
              status,
              category,
              start_date,
              end_date,
              start_time,
              duration,
              timestamp_requested
            FROM nexdoor.tasks
            WHERE
              (requester_id != ${userId} AND
              (
                helper_id != ${userId} OR
                helper_id IS NULL
              )) AND ((
                (
                  SELECT coordinate
                  FROM nexdoor.address
                  WHERE address_id=nexdoor.tasks.address_id
                )
                <@>
                (${coordinate})
                  ) < ${range}
                )
            ORDER BY
              start_date,
              start_time
            LIMIT ${quantity}
            OFFSET ${offset}
        ) allothers
      ) as allothers
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

  // *************************************************************
  // EDIT TASK
  // *************************************************************
  // Needs from Front End - task info
  // Returns - string conf
  // *************************************************************
  /*
    // PUT /task/edit
    req.body =
    {
        "streetAddress": "180 Santa Monica Pier",
        "city": "Santa Monica",
        "state": "CA",
        "zipcode": 90401,
        "neighborhood": "Santa Monica",
        "description": "I have fallen and I cannot get up. Help please",
        "carRequired": false,
        "laborRequired": false,
        "category": "Favor",
        "startDate": "2021/05/22",
        "endDate": "2021/05/27",
        "startTime": "08:00",
        "duration": 2,
        "taskId": 41
    }
  */
  // *************************************************************
  editTask: async ({
    streetAddress,
    city,
    state,
    zipcode,
    neighborhood,
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
    taskId,
  }) => {
    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    let coordinate;
    let newAddId;
    let addressId;

    const queryStr1 = `
      SELECT address_id
      FROM nexdoor.address
      WHERE street_address='${streetAddress}'
      AND zipcode=${zipcode}
    ;`;

    const queryStr2 = `
    UPDATE nexdoor.tasks
    SET
      address_id=${addressId},
      description='${description}',
      car_required=${carRequired},
      physical_labor_required=${laborRequired},
      category='${category}',
      start_date='${startDate}',
      end_date='${endDate}',
      start_time='${startTime}',
      duration=${duration}
    WHERE task_id=${taskId}
  ;`;

    const queryStr3 = `
        INSERT INTO nexdoor.address
        (
          street_address,
          city,
          state,
          zipcode,
          neighborhood,
          coordinate
        )
        VALUES
        (
          '${streetAddress}',
          '${city}',
          '${state}',
          ${zipcode},
          '${neighborhood}',
          ${coordinate}
        )
        RETURNING address_id
    ;`;

    const queryStr4 = `
      UPDATE nexdoor.tasks
      SET
        nexdoor.tasks.address_id=${newAddId},
        description='${description}',
        car_required=${carRequired},
        physical_labor_required=${laborRequired},
        category='${category}',
        start_date='${startDate}',
        end_date='${endDate}',
        start_time='${startTime}',
        duration=${duration}
      WHERE task_id=${taskId}
    ;`;

    try {
      const data = await db.query(queryStr1);
      if (data.rows.length > 0) {
        addressId = data.rows[0].address_id;
        await db.query(queryStr2);
        return `Updated task ${taskId}`;
      }
      const testCoord = await getCoordinates(addressQuery);
      coordinate = `point(${testCoord.lng},${testCoord.lat})`;
      const addressData = await db.query(queryStr3);
      newAddId = addressData.rows[0].address_id;
      await db.query(queryStr4);
      return 'Task finally updated';
    } catch (err) {
      return err;
    }
  },
};

module.exports = taskModels;
