/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const db = require('../../db');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const tasksService = {
  getTasks: async ({
    userId,
    range,
    quantity,
    offset,
  }) => {
    if (!userId || !range || !quantity) { throw new ApiError('Undefined params (userId || range || quantity)', httpStatusCodes.BAD_REQUEST); }
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

  addTask: async ({
    userId,
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
  }, addressId) => {
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

  updateTask: async ({
    description,
    carRequired,
    laborRequired,
    category,
    startDate,
    endDate,
    startTime,
    duration,
    taskId,
  }, addressId) => {
    if (!description || !taskId || !category || !startDate) {
      throw new ApiError('Error updating task, parameters undefined', httpStatusCodes.BAD_REQUEST);
    }
    if (!addressId) {
      throw new ApiError('Error updating task, addressId undefined. Check google api', httpStatusCodes.INTERNAL_SERVER);
    }
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
    return { task_id: taskId };
  },

  deleteTask: async ({ taskId }) => {
    const queryStr = `
      DELETE FROM nexdoor.tasks
      WHERE task_id=${taskId}
    ;`;
    await db.query(queryStr);
    return { task_id: taskId };
  },

  updateTaskStatus: async ({ status, taskId }) => {
    const queryStr = `
      UPDATE nexdoor.tasks
      SET status='${status}'
      WHERE task_id=${taskId}
    ;`;
    await db.query(queryStr);
    return { task_id: taskId };
  },

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
    await db.query(queryStr);
    return { task_id: taskId };
  },

  deleteTaskHelper: async ({ taskId }) => {
    const queryStr = `
      UPDATE nexdoor.tasks
      SET
        helper_id=null,
        status='Open'
      WHERE task_id=${taskId}
    ;`;
    await db.query(queryStr);
    const taskIdDTO = { task_id: taskId };
    return taskIdDTO;
  },

  // *************************************************************
  // closeTask: async ({
  //   taskId,
  //   rating,
  //   review,
  // }) => {
  //   const queryStr1 = `
  //     UPDATE nexdoor.users
  //       SET
  //         task_count=task_count + 1,
  //         karma=karma + ${rating}
  //       WHERE user_id=(
  //         SELECT helper_id
  //         FROM nexdoor.tasks
  //         WHERE task_id=${taskId}
  //       )
  //   ;`;
  //   const queryStr2 = `
  //     UPDATE nexdoor.users
  //     SET avg_rating=karma / task_count
  //     WHERE user_id=(
  //       SELECT helper_id
  //       FROM nexdoor.tasks
  //       WHERE task_id=${taskId}
  //     )
  //   ;`;
  //   const queryStr3 = `
  //     UPDATE nexdoor.tasks
  //     SET status='Closed'
  //     WHERE task_id=${taskId}
  //   ;`;
  //   const queryStr4 = `
  //     INSERT INTO nexdoor.reviews (
  //       rating,
  //       review,
  //       requester_id,
  //       helper_id
  //     )
  //     VALUES (
  //       ${rating},
  //       '${review}',
  //       (
  //         SELECT requester_id
  //         FROM nexdoor.tasks
  //         WHERE task_id=${taskId}
  //       ),
  //       (
  //         SELECT helper_id
  //         FROM nexdoor.tasks
  //         WHERE task_id=${taskId}
  //       )
  //     )
  //   ;`;
  //   try {
  //     await db.query(queryStr1);
  //     await db.query(queryStr2);
  //     await db.query(queryStr3);
  //     await db.query(queryStr4);
  //     return `Task ${taskId} closed`;
  //   } catch (err) {
  //     return err;
  //   }
  // },
};

module.exports = tasksService;
