process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('./app');

const db = require('./db');

afterAll(async () => {
  redisClient.quit();
  db.end();
});

let testTaskIdToDelete;

/* ************************************************************************* */
// ANNOUNCEMENTS //

describe('GET api/announcements/:quantity', () => {
  it('should get announcements and return 200 status when called with the appropriate inputs', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .get('/api/announcements/1');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('POST api/announcements', () => {
  it('should add an announcement and return 200 status when called with the appropriate inputs', async () => {
    // Arrange
    const body = {
      announcementBody: 'My house is on fire! Please help!',
      date: '2021-07-31',
      time: '23:30:00',
    };

    // Act
    const res = await supertest(app)
      .post('/api/announcements/1')
      .send(body);

    // Assert
    expect(res.statusCode).toEqual(200);
  });
});

/* ************************************************************************* */
// MESSAGES //

describe('GET /api/messages/:taskId', () => {
  it('should get messages and return a 200 status when called with appropriate inputs', async () => {
    // Arrage + Act
    const response = await supertest(app)
      .get('/api/messages/1');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('POST api/messages/:taskId/:userId', () => {
  it('should post a new message and return a 200 status when called with the appropriate inputs', async () => {
    // Arrange
    const message = {
      messageBody: 'How are you doing today?',
      date: '2021-07-31',
      time: '23:30:00',
      imgUrl: null,
    };

    // Act
    const response = await supertest(app)
      .post('/api/messages/1/1')
      .send(message);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

/* ************************************************************************* */
// TASKS //

describe('GET tasks/:userId/:range/:quantity/:offset', () => {
  it('should get tasks and return 200 status when called with the appropriate inputs', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .get('/api/tasks/1/1500/10/0');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('POST tasks/:userId', () => {
  it('Should add a task and return 200 status when called with the appropriate parameters', async () => {
    // Arrange
    const body = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighborhood: undefined,
      description: 'Can someone watch my dogs for an hour?',
      laborRequired: true,
      category: 'sitting',
      startDate: '2021-08-01',
      endDate: '2021-07-24',
      startTime: '22:35:00',
      duration: null,
      carRequired: false,
    };
    // jest.spyOn(locationsService, 'getAddress').mockImplementation(() => ({ address_id: 1 }));

    // Act
    const response = await supertest(app)
      .post('/api/tasks/1')
      .send(body);
    testTaskIdToDelete = response.body.task_id;

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('PUT /:taskId', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Should update a task and return a 200 status if called with the proper parameters with existing address', async () => {
    // Arrange
    const body = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighborhood: undefined,
      description: 'Can someone watch my dogs for an hour?',
      laborRequired: true,
      category: 'sitting',
      startDate: '2021-08-01',
      endDate: '2021-07-24',
      startTime: '22:35:00',
      duration: null,
      carRequired: false,
    };
    // jest.spyOn(locationsService, 'getAddress').mockImplementation(() => ({ address_id: 1 }));

    // Act
    const response = await supertest(app)
      .put('/api/tasks/1')
      .send(body);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('DELETE /:taskId', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Should delete a task and return a 200 status if called with the proper parameters', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .delete(`/api/tasks/${testTaskIdToDelete}`);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('PUT /:taskId/status', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Should update a task status and return a 200 status if called with the proper parameters', async () => {
    // Arrange
    const statusArr = ['Active', 'Open', 'Pending'];
    const randomIndex = Math.floor(Math.random() * 2 + 1);

    // Act
    const response = await supertest(app)
      .put(`/api/tasks/1/status/${statusArr[randomIndex]}`);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('PUT /:taskId/helper/:userId', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Should update a task helper to the current user and return a 200 status if called with the proper params', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .put('/api/tasks/1/helper/1');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('DELETE /:taskId/helper/', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Should delete the task helper and return a 200 status if called with the proper params', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .delete('/api/tasks/1/helper');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

/* ************************************************************************* */
// USERS //

describe('GET /api/users/:userId', () => {
  afterEach(() => jest.restoreAllMocks());
  it('should get users and return 200 status when called with the appropriate inputs', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .get('/api/users/1');

    // Assert
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      user_id: expect.any(Number),
      firstname: expect.any(String),
      lastname: expect.any(String),
      email: expect.any(String),
      karma: expect.any(Number),
      average_rating: expect.any(Number),
      address: expect.any(Object),
    });
  });
});

describe('POST /api/users', () => {
  afterEach(() => jest.restoreAllMocks());
  it('should add a user and return 200 status when called with appropriate inputs', async () => {
    // Arrange
    const randomizedNums = Math.floor(Math.random() * 987654321);
    const body = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighborhood: undefined,
      firstName: 'Jimbo',
      lastName: 'Testaker',
      password: 'notA4pa!sword',
      confirm_password: 'notA4pa!sword',
      email: `jimbotester${randomizedNums}@tester.com`,
      imgUrl: 'www.google.com',
    };

    // Act
    const response = await supertest(app)
      .post('/api/users/')
      .send(body);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('GET api/users/rating/:quantity/:userId/:range', () => {
  afterEach(() => jest.restoreAllMocks());
  it('Gets users array and returns a 200 status when called with appropriate inputs', async () => {
    // Arrange + Act
    const response = await supertest(app)
      .get('/api/users/rating/10/1/100');

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});

describe('POST api/users/login', () => {
  afterEach(() => jest.restoreAllMocks());
  it('returns a 200 status and a user DTO', async () => {
    // Arrange
    const body = {
      password: 'notA4pa!sword',
      email: 'jimbotester@tester.com',
    };

    // Act
    const response = await supertest(app)
      .post('/api/users/login')
      .send(body);

    // Assert
    expect(response.statusCode).toEqual(200);
  });
});
