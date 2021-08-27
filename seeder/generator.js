/* eslint camelcase: 0 */ // --> OFF
/* eslint no-await-in-loop: 0 */ // --> OFF
/* eslint no-unneeded-ternary: 0 */ // --> OFF

const faker = require('faker');
// const bcrypt = require('bcrypt');
const db = require('../api/db');

const randomInt = (n) => Math.floor(Math.random() * n + 1);
const randomIntWithZero = (n) => Math.floor(Math.random() * n);
const randomBinary = () => Math.floor(Math.random() * 2);

/* ************************************************************************* */
/* ************************************************************************* */

// ADDRESS //

const addAddress = async () => {
  const generateAddress = () => {
    const addressObj = {
      street_address: faker.address.streetAddress(),
      city: 'Los Angeles',
      state: 'CA',
      zipcode: 90012,
      neighborhood: null,
      coordinate: 'point(-118.2400339,34.0614828)',
    };
    return addressObj;
  };
  const address = await generateAddress();
  const queryString = `
    INSERT INTO nexdoor.address (
    street_address,
    city,
    state,
    zipcode,
    neighborhood,
    coordinate
    )
    VALUES (
    '${address.street_address}',
    '${address.city}',
    '${address.state}',
    ${address.zipcode},
    '${address.neighborhood}',
    ${address.coordinate}
    )
    RETURNING address_id
  `;
  await db.query(queryString);
};

const seedAddress = async () => {
  let counter = 0;
  while (counter < 0) {
    try {
      await addAddress();
      counter += 1;
    } catch (err) {
      console.log(err);
    }
  }
  console.log('done');
};

/* ************************************************************************* */
/* ************************************************************************* */

// USER

const addUserToDb = async () => {
  const generateUser = async () => {
    // const hash = await bcrypt.hashSync(faker.internet.password(), 10);
    const userObj = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: '3wlwfnw3ls9w3fndwfd',
      email: randomInt(10040) + faker.internet.email(),
      address_id: randomInt(999999),
      karma: randomInt(100),
      task_count: randomInt(100),
      average_rating: randomInt(5),
      profile_picture_url: faker.image.imageUrl(),
    };
    return userObj;
  };

  const user = await generateUser();

  const queryString = `
    INSERT INTO nexdoor.users (
      firstname,
      lastname,
      password,
      email,
      address_id,
      karma,
      task_count,
      average_rating,
      profile_picture_url,
      acct_created_timestamp
    )
    VALUES (
      '${user.firstname}',
      '${user.lastname}',
      '${user.password}',
      '${user.email}',
      ${user.address_id},
      ${user.karma},
      ${user.task_count},
      ${user.average_rating},
      '${user.profile_picture_url}',
      (SELECT CURRENT_TIMESTAMP)
    )
    RETURNING user_id
  `;
  return db.query(queryString);
};

const seedUsers = async () => {
  let counter = 0;
  while (counter < 1000000) {
    try {
      await addUserToDb();
      counter += 1;
    } catch (err) {
      console.log(err);
    }
  }
  console.log('done');
};

/* ************************************************************************* */
/* ************************************************************************* */

// ANNOUNCEMENTS

const addAnnouncementToDb = async () => {
  const generateAnnouncement = () => {
    const announcementObj = {
      user_id: randomInt(999999),
      message_body: faker.lorem.sentence(),
      date: '2021-07-31T10:00:00.000Z',
      time: faker.datatype.datetime().toString().slice(16, 24),
    };
    return announcementObj;
  };
  const announcement = generateAnnouncement();
  const queryString = `
  INSERT INTO nexdoor.announcements (
    user_id,
    message_body,
    date,
    time
  )
  VALUES (
    ${announcement.user_id},
    '${announcement.message_body}',
    '${announcement.date}',
    '${announcement.time}'
  )`;

  await db.query(queryString);
};

const seedAnnouncements = async () => {
  let counter = 1000000;
  while (counter < 0) {
    try {
      await addAnnouncementToDb();
      counter += 1;
    } catch (err) {
      console.log(err);
    }
  }
  // db.end();
  console.log('done seeding announcements');
};

/* ************************************************************************* */
/* ************************************************************************* */

// SESSIONS

// const addSessionToDb = () => {
//   const generateSession = () => {
//     const session_hash = '2o3ifn2oifsldjkfn3';
//     const user_id = randomInt(999999);

//     const sessionsObj = {
//       session_hash,
//       user_id,
//     };

//     return sessionsObj;
//   };
//   const session = generateSession();

//   const queryString =
// }
/* ************************************************************************* */
/* ************************************************************************* */

// TASKS

const addTaskToDb = async () => {
  const generateTask = () => {
    const statuses = ['open', 'pending', 'active', 'closed'];
    const categories = ['labor', 'sitting', 'favor'];

    const taskObj = {
      requester_id: randomInt(999999),
      helper_id: randomBinary() ? randomInt(999999) : null,
      address_id: randomInt(999999),
      description: faker.lorem.sentences(),
      car_required: randomBinary() ? true : false,
      labor_required: randomBinary() ? true : false,
      status: statuses[randomIntWithZero(3)],
      category: categories[randomIntWithZero(3)],
      start_date: '2021-07-31T10:00:00.000Z',
      end_date: '2021-07-31T10:00:00.000Z',
      start_time: faker.datatype.datetime().toString().slice(16, 24),
      duration: null,
    };

    return taskObj;
  };

  const task = generateTask();

  const queryString = `INSERT INTO nexdoor.tasks (
    requester_id,
    helper_id,
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
    ${task.requester_id},
    ${task.helper_id},
    ${task.address_id},
    '${task.description}',
    ${task.car_required},
    ${task.labor_required},
    '${task.status}',
    '${task.category}',
    '${task.start_date}',
    '${task.end_date}',
    '${task.start_time}',
    ${task.duration},
    (SELECT CURRENT_TIMESTAMP)
  )`;
  await db.query(queryString);
};

const seedTasks = async () => {
  let counter = 0;
  while (counter < 1000000) {
    try {
      await addTaskToDb();
      counter += 1;
    } catch (err) {
      console.log(err);
    }
  }
  // db.end();
  console.log('done seeding tasks');
};

/* ************************************************************************* */
/* ************************************************************************* */

const addMessagesToDb = async () => {
  const generateMessage = () => {
    const messageObj = {
      task_id: randomInt(999999),
      user_id: randomInt(999999),
      message_body: faker.lorem.sentence(),
      date: '2021-07-31T10:00:00.000Z',
      time: faker.datatype.datetime().toString().slice(16, 24),
      photo_url: null,
    };
    return messageObj;
  };
  const message = generateMessage();

  const queryString = `INSERT INTO nexdoor.messages
    (
      task_id,
      user_id,
      message_body,
      date,
      time,
      photo_url
    )
    VALUES
    (
      ${message.task_id},
      ${message.user_id},
      '${message.message_body}',
      '${message.date}',
      '${message.time}',
      '${message.photo_url}'
    )`;
  await db.query(queryString);
};

const seedMessages = async () => {
  let counter = 0;
  while (counter < 1000000) {
    try {
      await addMessagesToDb();
      counter += 1;
    } catch (err) {
      console.log(err);
    }
  }
  db.end();
  console.log('done seeding messages');
};

seedMessages();

/* ************************************************************************* */
/* ************************************************************************* */

const seed = async () => {
  await seedAddress();
  await seedUsers();
  await seedAnnouncements();
  await seedTasks();
  await seedMessages();
};

seed();
