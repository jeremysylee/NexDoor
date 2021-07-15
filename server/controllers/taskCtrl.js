/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const db = require('../../db/index');
const getCoordinates = require('./coordinates');
/*________________________________________________________________
TABLE OF CONTENTS
- Add a task with a new address (not user's home): 19 - 135
- Add a task with a home address: 137 - 214
- Add a task after checking if the address already exists in db: 216 - 397
- Get x # of tasks ordered by date/time: 399 - 526
- Get tasks in mileage range from user's home address: 528 - 680
- Get requester tasks for a user: 682 - 805
- Get helper tasks for a user: 807 - 937
- Update helper on a task (and change status to pending): 939 - 968
- Remove helper from a task (and change status to open): 970 - 999
- Update a task status to active, completed, or closed: 1001 - 1028
________________________________________________________________*/
const taskControllers = {
// *************************************************************
  // ADD TASK WITH NEW ADDRESS (i.e not the user's home address)
  // *************************************************************
  //   Needs from Front End - userId, street address, city, state, zipcode, coordinate (from GoogleMaps API), description, car required (optional), labor required (optional), category, start date, end date, start time, duration,
  //   Returns - String confirmation
  // *************************************************************
  // POST api/task/new/:userId
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
    "startDate": "08/10/2021",
    "endDate": "08/21/2021",
    "startTime": "5:08",
    "duration": 2
  }
  res = 'Added task to db'
  */
  // *************************************************************
  addTaskNewAddress: (req, res) => {
    const { userId } = req.params;
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
      startDate,
      endDate,
      startTime,
      duration,
    } = req.body;

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
      db.query(queryStr)
        .then(() => {
          res.status(200).send('Added task to db');
        })
        .catch((err) => {
          res.status(400).send(err.stack);
        });
    };
    getCoordinates(addressQuery)
      .then((testCoord) => {
        coordinate = `point(${testCoord.lng},${testCoord.lat})`;
      })
      .then(() => {
        queryDb();
      })
      .catch((err) => {
        res.status(400).send('Error getting coordinates', err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // ADD A TASK AT A USER'S HOME ADDRESS
  // *************************************************************
  // Needs from Front End - userId, description, car required(optional), labor required(optional), category, start date, end date, start time, duration
  // *************************************************************
  /*
    POST api/task/home/:userId
    req.body =
      {
        "description": "Can somebody help me put up a fence please",
        "carRequired": false,
        "laborRequired": true,
        "category": "labor",
        "startDate": "05/13/2021",
        "endDate": "05/13/2021",
        "startTime": "10:08",
        "duration": 1
      }
    res = 'Added task to db'
  */
  // *************************************************************
  addTaskHomeAddress: (req, res) => {
    const { userId } = req.params;

    const {
      description,
      carRequired,
      laborRequired,
      category,
      startDate,
      endDate,
      startTime,
      duration,
    } = req.body;

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

    db.query(queryStr)
      .then(() => {
        res.status(200).send('Added task to db');
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // ADD TASK AFTER CHECKING FOR EXISTING ADDRESS
  // *************************************************************
  //  Needs from Front End - requester user id, street address, city, state, zipcode, neighborhood (optional), description, car required (optional), labor required(optional), category, start date, end date, start time, duration
  //  Returns - Confirmation string (new address if address wasn't already in the db, old address if it was)
  // *************************************************************
  /*
    POST /api/task/check/:userID (requester)
    req.body =
    {
      "streetAddress": "85 Bronson",
      "city": "Los Angeles",
      "state": "CA",
      "zipcode": 90027,
      "neighborhood": "Glendale",
      "description": "help me with my 17 turtles",
      "carRequired": false,
      "laborRequired": true,
      "category": "favor",
      "startDate": "04/11/2021",
      "endDate": "04/22/2021",
      "startTime": "11:00",
      "duration": 3
    }
    res = 'Added task with new address to db'
  */
  // *************************************************************

  addTaskCheckAddress: (req, res) => {
    const { userId } = req.params;
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
      startDate,
      endDate,
      startTime,
      duration,
    } = req.body;

    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    let coordinate;

    const queryStr1 = `
      SELECT address_id
      FROM nexdoor.address
      WHERE street_address='${streetAddress}'
      AND zipcode=${zipcode}
    `;

    const queryStr2 = `
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
        (
          SELECT address_id
          FROM nexdoor.address
          WHERE street_address='${streetAddress}'
          AND zipcode=${zipcode}
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
      )
    `;

    const queryDb = () => {
      const queryStr3 = `
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

      db.query(queryStr3)
        .then(() => {
          res.send('Added task with new address to db');
        })
        .catch((err) => {
          res.status(400).send(err.stack);
        });
    };

    db.query(queryStr1)
      .then((address) => {
        if (address.rows.length > 0) {
          db.query(queryStr2)
            .then(() => {
              res.send('Added task with old address to db');
            })
            .catch((err) => {
              res.status(400).send(err.stack);
            });
        } else {
          getCoordinates(addressQuery)
            .then((testCoord) => {
              coordinate = `point(${testCoord.lng},${testCoord.lat})`;
            })
            .then(() => {
              queryDb();
            })
            .catch((err) => {
              res.status(400).send('Error getting coordinates', err.stack);
            });
        }
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // GET X # OF TASKS
  // *************************************************************
  //   Needs from Front End - none
  //   Returns - array of task objects, ordered by start date and start time
  // *************************************************************
  /*
    GET /api/tasks/:quantity
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
  getTasks: (req, res) => {
    const { quantity } = req.params;
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
      ORDER BY
        start_date,
        start_time
      LIMIT ${quantity};
    `;
    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getTasksInRange: (req, res) => {
    const { userId, range } = req.params;

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

    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getReqTasksByUser: (req, res) => {
    const { userId } = req.params;
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

    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getHelpTasksByUser: (req, res) => {
    const { userId } = req.params;
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
    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  updateHelper: (req, res) => {
    const { taskId, userId } = req.params;
    const queryStr = `
      UPDATE nexdoor.tasks
      SET
        helper_id=${userId},
        status='Pending'
      WHERE task_id=${taskId}
    `;
    db.query(queryStr)
      .then(() => {
        res.status(200).send('Updated helper, status pending');
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  removeHelper: (req, res) => {
    const { taskId } = req.params;
    const queryStr = `
      UPDATE nexdoor.tasks
      SET
        helper_id=null,
        status='Open'
      WHERE task_id=${taskId}
    ;`;
    db.query(queryStr)
      .then(() => {
        res.status(200).send('Removed helper, status open');
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************

  // *************************************************************
  // CHANGE TASK STATUS TO ACTIVE, COMPLETED, OR CLOSED
  // *************************************************************
  // Needs from Front End - status(active, completed, closed) taskId
  // Returns - String confirmation
  // *************************************************************
  /*
    PUT /task/change/:status/:taskId
    req.body = none
    res = 'Task 17 status set to complete'
  */
  // *************************************************************
  changeTaskStatus: (req, res) => {
    const { status, taskId } = req.params;
    const queryStr = `
      UPDATE nexdoor.tasks
      SET status='${status}'
      WHERE task_id=${taskId}
    ;`;
    db.query(queryStr)
      .then(() => {
        res.status(200).send(`Task ${taskId} status set to ${status}`);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************
};

module.exports = taskControllers;


/// GET TASKS IN RANGE WITH A NON-HOME ADDRESS