process.env.NODE_ENV = 'test';

const axios = require('axios');
const getCoordinates = require('./coordinates');
const locationsService = require('./service');
const locationsController = require('./controller');
const db = require('../../db');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

describe('Coordinates Helper Function', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Calls the google api with axios and transforms the response data into a string DTO', async () => {
    // Arrange
    const addressQuery = '$727+N+Broadway+128+Los Angeles+CA+90012';
    const mockReturnData = {
      data: {
        results: [{
          formatted_address: '727 N Broadway #128, Los Angeles, CA 90012, USA',
          geometry: { location: { lng: '-118.2400339', lat: '34.0614828' } },
        }],
        status: 'OK',
      },
    };
    const axiosSpy = await jest.spyOn(axios, 'get').mockImplementation(() => mockReturnData);

    // Act
    const coordinatesDTO = await getCoordinates(addressQuery);

    // Assert
    expect(axiosSpy).toBeCalled();
    expect(coordinatesDTO).toEqual('point(-118.2400339,34.0614828)');
  });
});

describe('Locations Controller', () => {
  describe('getAddressOrAdd', () => {
    it('calls the get address service, then the coordinates helper function, then the add address if address is not in database', async () => {
      // Arrange
      const getAddressSpy = jest.spyOn(locationsService, 'getAddress').mockImplementation(() => false);
      const getCoordinatesSpy = jest.spyOn(getCoordinates).mockImplementation(() => 'point(14231,234234)');
      const addAddressSpy = jest.spyOn(locationsService, 'addAddress').mockImplementation(() => ({ addressId: 1 }));
      const address = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighboorhood: undefined,
      };

      // Act
      await locationsController.getAddressOrAdd(address);

      // Assert
      expect(getAddressSpy).toBeCalled();
      expect(getCoordinatesSpy).toBeCalled();
      expect(addAddressSpy).toBeCalled();
    });

    it('calls the get address service but does not call getCoordinates or addAddress services if address does exist in db', async () => {
      // Arrange
      const getAddressSpy = jest.spyOn(locationsService, 'getAddress').mockImplementation(() => ({ addressId: 1 }));
      const getCoordinatesSpy = jest.spyOn(getCoordinates).mockImplementation(() => 'point(14231,234234)');
      const addAddressSpy = jest.spyOn(locationsService, 'addAddress').mockImplementation(() => ({ addressId: 1 }));
      const address = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighboorhood: undefined,
      };

      // Act
      await locationsController.getAddressOrAdd(address);

      // Assert
      expect(getAddressSpy).toBeCalled();
      expect(getCoordinatesSpy).not.toBeCalled();
      expect(addAddressSpy).not.toBeCalled();
    });
  });
});

describe('Locations Service', () => {
  describe('Add new address', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns an address id DTO on success', async () => {
      // Arrange
      const addressQueryParams = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighboorhood: undefined,
        coordinates: 'point(-118.2400339,34.0614828)',
      };
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ address_id: 1 }] }));

      // Act
      const addressIdDTO = await locationsService.addAddress(addressQueryParams);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(addressIdDTO).toEqual({ addressId: 1 });
    });

    it('throws an API error if called with missing request parameters (streetAddress)', async () => {
      // Arrange
      const addressQueryParams = {
        streetAddress: undefined,
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighboorhood: undefined,
        coordinates: 'point(-118.2400339,34.0614828)',
      };

      // Act
      const addAddress = (() => locationsService.addAddress(addressQueryParams));

      // Assert
      await expect(addAddress).rejects.toThrow(new ApiError('Undefined address / coordinates!', httpStatusCodes.BAD_REQUEST));
    });
  });

  describe('Get address Id', () => {
    afterEach(() => jest.restoreAllMocks());

    it('queries the db and returns address id DTO if address is found', async () => {
      // Arrange
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ address_id: 1 }] }));
      const params = { streetAddress: '727 N Broadway', zipcode: '90012' };

      // Act
      const addressIdDTO = await locationsService.getAddress(params);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(addressIdDTO).toEqual({ addressId: 1 });
    });

    it('queries the db and returns false if no address found', async () => {
      // Arrange
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [] }));
      const params = { streetAddress: '727 N Broadway', zipcode: '90012' };

      // Act
      const addressIdDTO = await locationsService.getAddress(params);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(addressIdDTO).toEqual(false);
    });
  });
});
