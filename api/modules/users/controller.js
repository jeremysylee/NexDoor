/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const usersService = require('./service');

/*________________________________________________________________
TABLE OF CONTENTS
- Add a new user: 15 - 122
- Get user info object: 124 - 186
- Get list of users ordered by highest rating: 188 - 231
- Check if email already exists in db: 233 - 268
- Get a users email and password: 270 - 298
________________________________________________________________*/
const userControllers = {
  // *************************************************************
  // ADD A NEW USER
  // *************************************************************
  // Needs from Front End - street address, city, state, zipcode, neighborhood (optional), coordinate (from GoogleMaps API), first name, last name, password, email, imgUrl (optional)
  // Returns - String confirmation
  // Notes
  // *************************************************************
  /*
    POST /api/user
      req.body =
      {
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
    res.userData = {
      user_id,
      firstname,
      lastname,
      email,
      address_id,
      karma,
      task_count,
      avg_rating,
      profile_picture_url,
    }
  */
  addUser: async (req, res, next) => {
    const userInfo = {
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      imgUrl: req.body.imgUrl,
    };
    try {
      const user = await usersService.addUser(userInfo);
      res.status(200).send(user);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // GET USER INFO BY USERID
  // *************************************************************
  //   Needs from Front End - userId
  //   Returns - user object for given ID
  // *************************************************************
  /*
    GET /api/user/info/${userId}
    req.body = none;
    res = {
      "firstname": "Spongebob",
      "lastname": "Squarepants",
      "email": "ss@gmail.com",
      "karma": 0,
      "task_count": 0,
      "avg_rating": 5,
      "profile_picture_url": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
      "address": {
          "street_address": "538 Newcastle",
          "city": "Los Angeles",
          "state": "CA",
          "zipcode": "90028",
          "neighborhood": "Los Feliz"
      }
  */
  // *************************************************************
  getUser: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await usersService.getUser(userId);
      res.status(200).send(user);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // GET USERS ORDERED BY RATING
  // *************************************************************
  //   Needs from front end - max quantity of results, defaults to 10
  //   Returns - array of user objects, ordered by user's average rating
  // *************************************************************
  /*
    GET /users/rating/${quantity}
    req.body = none
    res =
      [
        {
          "user_id": 36,
          "firstname": "Erika",
          "lastname": "Chumbles",
          "address_id": 71,
          "karma": 58,
          "task_count": 15,
          "avg_rating": 3,
          "profile_picture_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Erika_Eleniak_2011.jpg",
          "reviews": [
              {
                  "review_id": 1,
                  "rating": 5,
                  "review": "Best couch carrying help I have ever received in my life.",
                  "requester_id": 35,
                  "helper_id": 36
              },
              .....
          ]
        },
        .......
      ]
  */
  // *************************************************************
  getUsersByRating: async (req, res, next) => {
    const { quantity } = req.params;
    try {
      const users = await usersService.getUsersByRating(quantity);
      res.status(200).send(users);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // GET USERS IN RANGE ORDERED BY RATING
  // *************************************************************
  //   Needs from front end - max quantity of results, defaults to 10
  //   Returns - array of user objects, ordered by user's average rating
  // *************************************************************
  /*
    GET /users/rangerating/:quantity/:userId/:range
      req.body = none
      res =
        [
          {
            "user_id": 36,
            "firstname": "Erika",
            "lastname": "Chumbles",
            "address_id": 71,
            "karma": 58,
            "task_count": 15,
            "avg_rating": 3,
            "profile_picture_url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Erika_Eleniak_2011.jpg",
            "reviews": [
                {
                    "review_id": 1,
                    "rating": 5,
                    "review": "Best couch carrying help I have ever received in my life.",
                    "requester_id": 35,
                    "helper_id": 36
                },
                .....
            ]
          },
          .......
        ]
  */
  // *************************************************************
  getUsersInRangeByRating: async (req, res, next) => {
    const { userId, range } = req.params;
    try {
      const users = await usersService.getUsersInRangeByRating(userId, range);
      res.status(200).send(users);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // CHECK FOR EMAIL IN DB
  // *************************************************************
  // Needs from Front End - email address to check
  // Returns - boolean
  // *************************************************************
  /*
    GET /api/email
    req.body = {
      "email": "ss@gmail.com"
    }
    res = true
    req.body = {
      "email": "thisemaildoesntexistindb@gmail.com"
    }
    res = false
  */
  // *************************************************************
  checkForEmail: async (req, res, next) => {
    const { email } = req.body;
    try {
      const userExists = await usersService.checkForEmail(email);
      res.status(200).send(userExists);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // GET USER CREDENTIALS
  // *************************************************************
  /*
    GET /api/credentials/:userId
    req.body = none
    res =
      {
        "email": "questionmaster3000@gmail.com",
        "password": "chobiden"
      }
  */
  // *************************************************************
  getUserCredentials: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const credentials = await usersService.getUserCredentials(userId);
      res.status(200).send(credentials);
    } catch (err) {
      next();
    }
  },
  // *************************************************************

  // *************************************************************
  // AUTHENTICATE USERNAME & PASSWORD
  // *************************************************************
  /*  Takes a username and password and, if valid, returns a session

    GET /api/login
    req.body =
    {
        "email": "questionmaster3000@gmail.com",
        "password": "chobiden"
    }

    res =
      {
        user_id: 12345,
      }
  */
  // *************************************************************
  authenticateLogin: async (req, res, next) => {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const userId = await usersService.authenticateLogin(credentials);
      if (!userId) { res.status(404).send('error: password does not match'); }
      const user = await usersService.getUser(userId);
      req.session.user_id = userId;
      req.session.save();
      res.status(200).send(user);
    } catch (err) {
      req.session.destroy();
      next();
    }
  },
  // *************************************************************
  authenticateSession: async (req, res, next) => {
    if (req.session.user_id) {
      const params = { userId: req.session.user_id };
      try {
        const user = await usersService.getUser(params);
        res.status(200).send(user);
      } catch (err) {
        res.status(400).send(err.stack);
      }
    } else {
      next();
    }
  },

};

module.exports = userControllers;

// user_id fk field
// date with timezone - expiry
// only query for dates that have not already passed
