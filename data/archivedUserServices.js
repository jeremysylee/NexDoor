// const archived = {
//   checkForEmail: async (body) => {
//     const { email } = body;
//     const queryStr = `
//       SELECT EXISTS (
//         SELECT true FROM nexdoor.users
//         WHERE email='${email}'
//         LIMIT 1
//       )
//     `;
//     try {
//       const data = await db.query(queryStr);
//       return data.rows[0];
//     } catch (err) {
//       return err;
//     }
//   },

//   getUserCredentials: async (params) => {
//     const { userId } = params;
//     const queryStr = `
//       SELECT email, password
//       FROM nexdoor.users
//       WHERE user_id=${userId}
//     ;`;
//     try {
//       const data = await db.query(queryStr);
//       return data.rows[0];
//     } catch (err) {
//       return err;
//     }
//   },

//   getUsersByRating: async (params) => {
//     const { quantity } = params || 25;
//     const queryStr = `
//       SELECT
//         user_id,
//         firstname,
//         lastname,
//         address_id,
//         karma,
//         task_count,
//         avg_rating,
//         profile_picture_url,
//         (
//           SELECT ARRAY_TO_JSON(ARRAY_AGG(reviews))
//           FROM (
//             SELECT *
//             FROM nexdoor.reviews
//             WHERE helper_id=nexdoor.users.user_id
//           ) reviews
//         ) as reviews
//       FROM nexdoor.users
//       ORDER BY avg_rating
//       LIMIT ${quantity}
//     `;
//     try {
//       const data = db.query(queryStr);
//       return data.rows;
//     } catch (err) {
//       return err;
//     }
//   },
// }

// const controllers = {
//    // *************************************************************

//   // *************************************************************
//   // CHECK FOR EMAIL IN DB
//   // *************************************************************
//   // Needs from Front End - email address to check
//   // Returns - boolean
//   // *************************************************************
//   /*
//     GET /api/email
//     req.body = {
//       "email": "ss@gmail.com"
//     }
//     res = true
//     req.body = {
//       "email": "thisemaildoesntexistindb@gmail.com"
//     }
//     res = false
//   */
//   // *************************************************************
//   checkForEmail: async (req, res, next) => {
//     const { email } = req.body;
//     try {
//       const userExists = await usersService.checkForEmail(email);
//       res.status(200).send(userExists);
//     } catch (err) {
//       next();
//     }
//   },
//   // *************************************************************

//   // *************************************************************
//   // GET USER CREDENTIALS
//   // *************************************************************
//   /*
//     GET /api/credentials/:userId
//     req.body = none
//     res =
//       {
//         "email": "questionmaster3000@gmail.com",
//         "password": "chobiden"
//       }
//   */
//   // *************************************************************
//   getUserCredentials: async (req, res, next) => {
//     const { userId } = req.params;
//     try {
//       const credentials = await usersService.getUserCredentials(userId);
//       res.status(200).send(credentials);
//     } catch (err) {
//       next();
//     }
//   },
//   // *************************************************************

//   // *************************************************************
//   // AUTHENTICATE USERNAME & PASSWORD
//   // *************************************************************
//   /*  Takes a username and password and, if valid, returns a session

//     GET /api/login
//     req.body =
//     {
//         "email": "questionmaster3000@gmail.com",
//         "password": "chobiden"
//     }

//     res =
//       {
//         user_id: 12345,
//       }
//   */
//   // *************************************************************
// }
