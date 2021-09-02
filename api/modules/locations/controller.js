const locationsService = require('./service');
const coordinatesHelpers = require('./coordinates');

const locationsController = {
  getAddressOrAdd: async (address) => {
    let addressIdDTO = await locationsService.getAddress(address);
    if (!addressIdDTO) {
      const addressQuery = `${address.streetAddress}+${address.city}+${address.state}+${address.zipcode}`;
      const coordinates = await coordinatesHelpers.getCoordinates(addressQuery);
      addressIdDTO = await locationsService.addAddress(address, coordinates);
    }
    return addressIdDTO;
  },
};

module.exports = locationsController;
