const axios = require('axios');
const { url } = require('../config');

const task = {
  streetAddress: '1866 n Vermont Ave',
  city: 'Los Angeles',
  state: 'CA',
  zipcode: 90027,
  neighborhood: null,
  startDate: '2021-08-01',
  endDate: '2021-08-01',
  startTime: '23:30:00',
  category: 'labor',
  carRequired: false,
  description: 'test from postman1',
  laborRequired: false,
  duration: null,
};

const editedTask = {
  streetAddress: '1866 n Vermont Ave',
  city: 'Los Angeles',
  state: 'CA',
  zipcode: 90027,
  neighborhood: null,
  startDate: '2021-08-01',
  endDate: '2021-08-01',
  startTime: '23:30:00',
  category: 'labor',
  carRequired: false,
  description: 'test from postman1',
  laborRequired: false,
  duration: null,
  taskId: 1,
};

describe('Messages API Integration', () => {
  test('should get message for task GET(/messages/:taskId)', async () => {
    const response = await axios.get(`${url}/api/messages/1`);
    expect(response.status).toEqual(200);
  });

  test('should post new test message POST(/messages/:taskId/:userId)', async () => {
    const response = await axios.post(`${url}/api/messages/1/1`,
      { messagebody: 'test', date: '2021-07-31', time: '17:30:00' });
    expect(response.status).toEqual(200);
  });
});

// describe('Tasks API Integration', () => {
//   test('should get master tasks list GET(/tasks/master/:userId/:range/:quantity/:offset)', async () => {
//     const response = await axios.get(`${url}/api/tasks/master/1/100/10/0`);
//     expect(response.status).toEqual(200);
//   });

//   test('ADD TASK: should add a task (/tasks/check/:userId)', async () => {
//     const response = await axios.post(`${url}/api/tasks/check/1`, task);
//     expect(response.status).toEqual(200);
//   });

//   test('EDIT TASK: should edit task (/tasks/edit)', async () => {
//     const response = await axios.put(`${url}/api/tasks/edit`, editedTask);
//     expect(response.status).toEqual(200);
//   });

//   test('should remove helper from a task (/tasks/rmhelp/:taskId)', async () => {
//     const response = await axios.put(`${url}/api/tasks/rmhelp/1`);
//     expect(response.status).toEqual(200);
//   });

//   test('should ADD helper to a task (/tasks/help/:taskId/:userId)', async () => {
//     const response = await axios.put(`${url}/api/tasks/help/1/1`);
//     expect(response.status).toEqual(200);
//   });

//   test('should CLOSE task status (/tasks/close/:taskId/:rating)', async () => {
//     const response = await axios.put(`${url}/api/tasks/close/1/5`, { review: 'great' });
//     expect(response.status).toEqual(200);
//   });

//   test('should CHANGE task status (/tasks/change/:status/:taskId)', async () => {
//     const response = await axios.put(`${url}/api/tasks/change/Pending/1`);
//     expect(response.status).toEqual(200);
//   });
// });

// describe('Users API Integration', () => {
//   test('should get user data (/users/info/:userId)', async () => {
//     const response = await axios.get(`${url}/api/users/info/1`);
//     expect(response.status).toEqual(200);
//   });

//   test('should get list of users by rating (/users/rating/:quantity)', async () => {
//     const response = await axios.get(`${url}/api/users/rating/10`);
//     expect(response.status).toEqual(200);
//   });

//   test('should get list of users by rating in range (/users/rangerating/:quantity/:userId/:range)', async () => {
//     const response = await axios.get(`${url}/api/users/rangerating/5/1/100`);
//     expect(response.status).toEqual(200);
//   });

//   test('should get list of users by rating in range (/users/rangerating/:quantity/:userId/:range)', async () => {
//     const response = await axios.get(`${url}/api/users/rangerating/5/1/100`);
//     expect(response.status).toEqual(200);
//   });
// });

// describe('Login API Integration', () => {
//   test('should log user in (/login)', async () => {
//     const response = await axios.post(`${url}/api/users/login`, {
//       email: 'tester@nexdoor.com',
//       password: 'Nexdoor!23',
//     });
//     expect(response.status).toEqual(200);
//   });

//   // test('should fail due to incorrect email formatting', async () => {
//   //   const response = await axios.post(`${url}/api/users/login`, {
//   //     email: 'tester@nexddfsfoor.com',
//   //     password: 'Nexdoor!23',
//   //   });
//   //   console.log(response.status, '<<<----------');
//   //   expect(() => response).toThrowError('error');
//   // });
// });

// describe('Announcements API Integration', () => {
//   test('should get announcements GET(/announcements/:quantity)', async () => {
//     const response = await axios.get(`${url}/api/announcements/1`);
//     expect(response.status).toEqual(200);
//   });

//   test('should post a new announcement POST(/announcements/:userId)', async () => {
//     const response = await axios.post(`${url}/api/announcements/1`, {
//       announcementBody: 'test',
//       date: '2021-07-31',
//       time: '23:30:00',
//     });
//     expect(response.status).toEqual(200);
//   });
// });
