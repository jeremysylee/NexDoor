const getCoordinates = require('./coordinates');
const locationsService = require('./service');
const db = require('../../db');

describe('Coordinates API', () => {
  it('gets coordinates from the google api when appropriate address query is submitted', async () => {
    // Arrange
    const streetAddress = '727+N+Broadway+128';
    const city = 'Los Angeles';
    const state = 'CA';
    const zipcode = 90012;
    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;

    // Act
    const coordinates = await getCoordinates(addressQuery);

    // Assert
    expect(coordinates).toEqual('point(-118.2400339,34.0614828)');
  });
});

describe('Locations component', () => {
  describe('Add new address', () => {
    afterEach(() => jest.restoreAllMocks());

    const addressQueryParams = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighboorhood: undefined,
      coordinates: 'point(-118.2400339,34.0614828)',
    };

    it('Returns an address id DTO on success', async () => {
      // Arrange + Act
      const addressId = await locationsService.addAddress(addressQueryParams);

      // Assert
      expect(addressId).toEqual({ address_id: expect.any(Number) });
    });

    it('throws an API error if called with incorrect coordinates request parameters (coordinates)', async () => {
      // Arrange
      addressQueryParams.coordinates = 'these coordinates are wrong';
      let error;

      // Act
      try {
        await locationsService.addAddress(addressQueryParams);
      } catch (err) {
        error = err;
      }

      // Assert
      expect(error).toEqual(new Error('syntax error at or near "coordinates"'));
    });
  });

  describe('Get address Id', () => {
    afterEach(() => jest.restoreAllMocks());

    it('queries the db and returns address id DTO if address is found', async () => {
      // Arrange
      const params = { streetAddress: '727 N Broadway', zipcode: '90012' };

      // Act
      const addressId = await locationsService.getAddress(params);

      // Assert
      expect(addressId).toEqual({ address_id: expect.any(Number) });
    });

    it('queries the db and returns false if no address found', async () => {
      // Arrange
      const params = { streetAddress: '2342342 Broadway Dr.', zipcode: '90012' };

      // Act
      const addressId = await locationsService.getAddress(params);

      // Assert
      expect(addressId).toEqual(false);
    });
  });
});

afterAll(() => {
  db.end();
});
