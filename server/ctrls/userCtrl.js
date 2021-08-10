/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const userModels = require('../models/userModel');

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
  addUser: (req, res) => {
    userModels.addUser(req.body)
      .then((userData) => {
        res.status(200).send(userData);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getUser: (req, res) => {
    userModels.getUser(req.params)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getUsersByRating: (req, res) => {
    userModels.getUsersByRating(req.params)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getUsersInRangeByRating: (req, res) => {
    userModels.getUsersInRangeByRating(req.params)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  checkForEmail: (req, res) => {
    userModels.checkForEmail(req.body)
      .then((exists) => {
        res.status(200).send(exists);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  getUserCredentials: (req, res) => {
    userModels.getUserCredentials(req.params)
      .then((credentials) => {
        res.status(200).send(credentials);
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
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
  authenticateLogin: (req, res) => {
    const { email, password } = req.body;
    userModels.authenticateLogin(req, email, password)
      .then((authentication) => {
        if (!authentication) {
          res.status(404).send('error: password does not match');
        }
        res.session.user_id = authentication;
        userModels.getUser(authentication)
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => {
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************
  authenticateSession: (req, res) => {
    if (req.session.user_id) {
      const { user_id } = req.session.user_id;
      res.status(200).send({ user_id });
    } else {
      res.status(418).send('error: user is a teapot');
    }
  },

};

module.exports = userControllers;

// user_id fk field
// date with timezone - expiry
// only query for dates that have not already passed
