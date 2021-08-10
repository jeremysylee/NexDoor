/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const getCoordinates = require('./coordinates');
const taskModel = require('../models/taskModel');
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
  /*
    POST api/task/new/:userId
    req:
      params: userId
      req.body =
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
    res: 'Added task to db'*/
  addTaskNewAddress: (req, res) => {
    const { userId } = req.params;
    taskModel.addTaskNewAddress(userId, req.body)
      .then((success) => res.status(200).send(success))
      .catch((err) => res.status(400).send(err.stack));
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
    taskModel.addTaskHomeAddress(userId, req.body)
      .then((success) => {
        res.status(200).send(success);
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
    taskModel.checkForAddress(req.body)
      .then((address) => {
        if (address.rows.length > 0) {
          const addressId = address.rows[0];
          taskModel.addTaskExistingAddress(req.body, req.params, addressId)
            .then((success) => res.status(200).send(success))
            .catch((err) => res.status(400).send(err));
        } else {
          taskModel.addTaskNewAddress(req.body, req.params)
            .then((success) => res.status(200).send(success))
            .catch((err) => res.status(400).send(err.stack));
        }
      })
      .catch((err) => { res.status(400).send(err.stack); });
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
  getTasks: (req, res) => {
    taskModel.getTasks(req.params)
      .then((tasks) => {
        res.status(200).send(tasks);
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
    taskModel.getTasksInRange(req.params)
      .then((tasks) => {
        res.status(200).send(tasks);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getTasksInRangeAltAddress: (req, res) => {
    taskModel.getTasksInRangeAltAddress(req.body, req.params)
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
    taskModel.getReqTasksByUser(req.params)
      .then((tasks) => {
        res.status(200).send(tasks);
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
    taskModel.getHelpTasksByUser(req.params)
      .then((tasks) => {
        res.status(200).send(tasks);
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
    taskModel.updateHelper(req.params)
      .then((success) => {
        res.status(200).send(success);
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
    taskModel.removeHelper(req.params)
      .then((success) => {
        res.status(200).send(success);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  changeTaskStatus: (req, res) => {
    taskModel.changeTaskStatus(req.params)
      .then((success) => {
        res.status(200).send(success);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  closeTask: (req, res) => {
    taskModel.closeTask(req.params, req.body)
      .then((success) => res.status(200).send(success))
      .catch((err) => err);
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
  deleteTask: (req, res) => {
    taskModel.deleteTask(req.params)
      .then((success) => {
        res.status(200).send(success);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getTasksMasterDefaultAddress: (req, res) => {
    taskModel.getTasksMasterDefaultAddress(req.params)
      .then((task) => {
        res.status(200).send(task);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },

  // *************************************************************
  // GET ALL TASKS WITHIN A MILEAGE RANGE FOR A USER AT AN ALTERNATE ADDRESS (HELPER TASKS, REQUESTER TASKS, ALL OTHER TASKS)
  // *************************************************************
  // Needs from Front End - userId, range (in miles), quantity, offset (quantity and offset only apply to 'all other tasks'), alternate address info
  // Returns - gigantic tasks object with keys for requested, helper, and all other which all hold arrays of task objects
  // *************************************************************
  getTasksMasterAltAddress: (req, res) => {
    taskModel.getTasksMasterAltAddress(req.params, req.body)
      .then((data) => { res.status(200).send(data); })
      .catch((err) => { res.status(400).send(err.stack); });
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
  editTask: (req, res) => {
    taskModel.editTask(req.body)
      .then((success) => { res.status(200).send(success); })
      .catch((err) => { res.status(400).send(err.stack); });
  },
};

module.exports = taskControllers;
