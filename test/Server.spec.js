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

describe('Tasks API Integration', () => {
  test('should get master tasks list GET(/tasks/master/:userId/:range/:quantity/:offset)', async () => {
    const response = await axios.get(`${url}/api/tasks/master/1/100/10/0`);
    expect(response.status).toEqual(200);
  });

  test('should ADD task (/task/check/:userId)', async () => {
    const response = await axios.post(`${url}/api/task/check/1`, task);
    expect(response.status).toEqual(200);
  });

  test('should UPDATE task (/task/edit)', async () => {
    const response = await axios.post(`${url}/api/task/edit`, editedTask);
    expect(response.status).toEqual(200);
  });

  test('should REMOVE helper from a task (/task/rmhelp/:taskId)', async () => {
    const response = await axios.put(`${url}/api/task/rmhelp/1`);
    expect(response.status).toEqual(200);
  });

  test('should ADD helper to a task (/task/help/:taskId/:userId)', async () => {
    const response = await axios.put(`${url}/api/task/help/1/1`);
    expect(response.status).toEqual(200);
  });

  test('should CLOSE task status (/task/close/:taskId/:rating)', async () => {
    const response = await axios.put(`${url}/api/task/close/1/5`, { review: 'great' });
    expect(response.status).toEqual(200);
  });

  test('should CHANGE task status (/task/change/:status/:taskId)', async () => {
    const response = await axios.put(`${url}/api/task/change/Pending/1`);
    expect(response.status).toEqual(200);
  });
  // test('should post new test message POST(/messages/:taskId/:userId)', async () => {
  //   const response = await axios.post(`${url}/api/messages/1/1`,
  //     { messagebody: 'test', date: '2021-07-31', time: '17:30:00' });
  //   expect(response.status).toEqual(200);
  // });
});

// describe('Get post message (/messages/:taskId/:userId)', () => {
// });
// describe('Tasks API Integration', () => {
//   test('should get master tasks list GET(/tasks/master/:userId/:range/:quantity/:offset)', async () => {
//     const response = await axios.get(`${url}/api/tasks/master/1/100/10/0`);
//     expect(response.status).toEqual(200);
//     expect(response.data.requested).toBeDefined();
//     expect(response.data.helper).toBeDefined();
//     expect(response.data.allothers).toBeDefined();
//   });