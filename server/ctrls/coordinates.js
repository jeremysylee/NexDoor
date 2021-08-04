const axios = require('axios');

const getCoordinates = async (addressQuery) => {
  const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}
    &key=AIzaSyAF8YxtZo1Y_VwXnNrmb1ErGpupP1kYniI`)
    .then((coordinate) => coordinate.data.results[0].geometry.location);
  return result;
};

module.exports = getCoordinates;
