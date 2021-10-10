const axios = require('axios');

const coordinatesHelpers = {
  getCoordinates: async (addressQuery) => {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}
      &key=AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI`);
    const coordinates = data.results[0].geometry.location;
    const coordinatesDTO = `point(${coordinates.lng},${coordinates.lat})`;
    return coordinatesDTO;
  },
};

module.exports = coordinatesHelpers;
