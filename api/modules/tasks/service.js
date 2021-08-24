/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const db = require('../../db');
const getCoordinates = require('../locations/coordinates');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const tasksService = {
  addTask: async ({
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
    if (!userId || !description || !category || !startDate) {
      throw new ApiError('Undefined parameters', httpStatusCodes.BAD_REQUEST);
    }
    if (!addressId) {
      throw new ApiError('addressId undefined', httpStatusCodes.INTERNAL_SERVER);
    }
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
    RETURNING task_id
  `;
    const data = await db.query(queryStr);
    const taskId = data.rows[0];
    return taskId;
  },

  // *************************************************************
  updateTaskHelper: async ({
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
  updateTaskStatus: async ({ status, taskId }) => {
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
  getTasks: async ({
    userId,
    range,
    quantity,
    offset,
  }) => {
    if (!userId || !range || !quantity) { throw new ApiError('Undefined params (userId || range || quantity', httpStatusCodes.BAD_REQUEST); }
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
    const data = await db.query(queryStr);
    const tasksDTO = data.rows;
    return tasksDTO;
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
  updateTask: async ({
    addressId,
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
    const queryStr = `
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

    await db.query(queryStr);
    return `Task ${taskId} finally updated`;
  },
};

module.exports = tasksService;
