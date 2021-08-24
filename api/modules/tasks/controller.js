/* eslint-disable spaced-comment */
/* eslint-disable max-len */
// const getCoordinates = require('./coordinates');
const tasksService = require('./service');
const locationsService = require('../locations/service');
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
  addTask: async (req, res, next) => {
    const task = {
      userId: req.params.userId,
      addressId: undefined,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      description: req.body.description,
      laborRequired: req.body.laborRequired,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      duration: req.body.duration,
      carRequired: req.body.carRequired,
    };
    try {
      task.addressId = await locationsService.getAddress(task).address_id;
      if (!task.addressId) {
        task.addressId = await locationsService.addAddress(task).address_id;
        await locationsService.addAddress(task).address_id;
      }
      const taskId = await tasksService.addTask(task);
      res.status(200).send(taskId);
    } catch (err) {
      next(err);
    }
  },

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

  updateHelper: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const update = await tasksService.updateHelper(userId);
      res.status(200).send(update);
    } catch (err) {
      next(err);
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
  removeHelper: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const success = await tasksService.removeHelper(taskId);
      res.status(200).send(success);
    } catch (err) {
      next(err);
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
  changeTaskStatus: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const success = await tasksService.changeTaskStatus(taskId);
      res.status(200).send(success);
    } catch (err) {
      next(err);
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
  closeTask: async (req, res, next) => {
    const { rating } = req.params;
    const { review } = req.body;
    try {
      const success = await tasksService.closeTask(rating, review);
      res.status(200).send(success);
    } catch (err) {
      next(err);
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
  deleteTask: async (req, res, next) => {
    const { taskId } = req.params;
    try {
      const success = await tasksService.deleteTask(taskId);
      res.status(200).send(success);
    } catch (err) {
      next(err);
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
  getTasks: async (req, res, next) => {
    const params = {
      userId: req.params.userId,
      range: req.params.range,
      quantity: req.params.quantity,
      offset: req.params.offset,
    };
    try {
      const tasks = await tasksService.getTasks(params);
      res.status(200).send(tasks);
    } catch (err) {
      next(err);
    }
  },

  // *************************************************************
  // GET ALL TASKS WITHIN A MILEAGE RANGE FOR A USER AT AN ALTERNATE ADDRESS (HELPER TASKS, REQUESTER TASKS, ALL OTHER TASKS)
  // *************************************************************
  // Needs from Front End - userId, range (in miles), quantity, offset (quantity and offset only apply to 'all other tasks'), alternate address info
  // Returns - gigantic tasks object with keys for requested, helper, and all other which all hold arrays of task objects
  // *************************************************************
  getTasksMasterAltAddress: async (req, res, next) => {
    const {
      userId, range,
      quantity, offset,
    } = req.params;
    try {
      const tasks = await tasksService.getTasksMasterAltAddress(userId, range, quantity, offset);
      res.status(200).send(tasks);
    } catch (err) {
      next(err);
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
  updateTask: async (req, res, next) => {
    const task = {
      addressId: undefined,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      description: req.body.description,
      carRequired: req.body.false,
      laborRequired: req.body.laborRequired,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      duration: req.body.duration,
      taskId: req.body.taskId,
    };
    try {
      task.addressId = await locationsService.getAddress(task).address_id;
      if (!task.addressId) {
        task.addressId = await locationsService.addAddress(task).address_id;
      }
      const successMessage = await tasksService.updateTask(task);
      res.status(200).send(successMessage);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = taskControllers;
