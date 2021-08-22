const getCoordinates = require('./coordinates');

describe('Coordinates API', () => {
  it('gets coordinates from the google api when appropriate address query is submitted', async () => {
    // Arrange
    const streetAddress = '727+N+Broadway+128';
    const city = 'Los Angeles';
    const state = 'CA';
    const zipcode = 90012;
    const addressQuery = `${streetAddress}+${city}+${state}+${zipcode}`;
    console.log(addressQuery);
    // const addressQuery = '727+N+Broadway+128+LosAngeles+CA+90012';

    // Act
    const coordinates = await getCoordinates(addressQuery);

    // Assert
    expect(coordinates).toEqual('point(123,142)');
  });
});
