/* eslint-disable spaced-comment */
/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const session = require('express-session');
const db = require('../../db/index');
const getCoordinates = require('./coordinates');

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
    res = "User added to db"
  */
  addUser: (req, res) => {
    const {
      streetAddress,
      city,
      state,
      zipcode,
      firstName,
      lastName,
      password,
      email,
    } = req.body;
    const hashPass = bcrypt.hashSync(password, 10);

    const { imgUrl, neighborhood } = req.body || null;

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
        INSERT INTO nexdoor.users (
          firstname,
          lastname,
          password,
          email,
          address_id,
          karma,
          task_count,
          avg_rating,
          profile_picture_url,
          acct_created_timestamp
        )
        SELECT
          '${firstName}',
          '${lastName}',
          '${hashPass}',
          '${email}',
          address_id,
          0,
          0,
          null,
          '${imgUrl}',
          (SELECT CURRENT_TIMESTAMP)
        FROM X
        RETURNING
          user_id, firstname, lastname, email, address_id, karma, task_count, avg_rating, profile_picture_url
      `;

      db.query(queryStr)
        .then((data) => {
          console.log(data.rows[0])
          res.status(200).send(data.rows[0]);
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
    const { userId } = req.params;

    const queryStr = `
      SELECT
        firstname,
        lastname,
        email,
        karma,
        task_count,
        avg_rating,
        profile_picture_url, (
          SELECT ROW_TO_JSON(add)
          FROM (
            SELECT
              street_address,
              city,
              state,
              zipcode,
              neighborhood
            FROM nexdoor.address
            WHERE address_id=nexdoor.users.address_id
          ) add
        ) as address
      FROM nexdoor.users
      WHERE user_id=${userId};
    `;

    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows[0]);
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
            "user_id": 3,
            "firstname": "andrew",
            "lastname": "munoz",
            "password": "testing123",
            "email": "testing123@gmail.com",
            "address_id": 1,
            "karma": 0,
            "task_count": 0,
            "avg_rating": 5,
            "profile_picture_url": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png"
        },
        .......
      ]
  */
  // *************************************************************
  getUsersByRating: (req, res) => {
    const { quantity } = req.params || 25;
    const queryStr = `
      SELECT *
      FROM nexdoor.users
      ORDER BY avg_rating
      LIMIT ${quantity}
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
    const { email } = req.body;
    const queryStr = `
      SELECT EXISTS (
        SELECT true FROM nexdoor.users
        WHERE email='${email}'
        LIMIT 1
      )
    `;
    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows[0].exists);
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
    const { userId } = req.params;
    const queryStr = `
      SELECT email, password
      FROM nexdoor.users
      WHERE user_id=${userId}
    ;`;
    db.query(queryStr)
      .then((data) => {
        res.status(200).send(data.rows[0]);
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
  authenticateLogin: (req, res, next) => {
    const { email, password } = req.body;
    const queryStr = `
      SELECT user_id, password
      FROM nexdoor.users
      WHERE email='${email}'
    ;`;
    db.query(queryStr)
      .then((data) => {
        const user_id = data.rows[0].user_id;
        //compare passwords
        console.log(user_id);
        if (!bcrypt.compareSync(password, data.rows[0].password)) {
          res.status(404).send('error: password does not match');
        } else {
          //return session
          console.log("user_id:", user_id)
          req.session.user_id = user_id;
          req.session.save();
          // res.session.user_Id = user_id;
          res.status(200).send({user_id});
        }
      })
      .catch((err) => {
        console.log(err);
        req.session.destroy();
        res.status(400).send(err.stack);
      });
  },
  // *************************************************************
  authenticateSession: (req, res) => {
    console.log(req.session.user_id, "<---------- this is the associated uid");
    if(req.session.user_id) {
      const user_id = req.session.user_id;
      res.status(200).send({ user_id });
    } else {
      res.status(418).send("error: I'm a teapot");
    }
  },

};

module.exports = userControllers;

// user_id fk field
// date with timezone - expiry
// only query for dates that have not already passed
