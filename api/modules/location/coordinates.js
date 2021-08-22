const axios = require('axios');

const getCoordinates = async (addressQuery) => {
  console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}
  &key=AIzaSyCvxcrbKhY2G7JSTrB0ZA2hUb_vS2j45qU`);
  const coordinates = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressQuery}
    &key=AIzaSyCvxcrbKhY2G7JSTrB0ZA2hUb_vS2j45qU`)
    .then((coordinate) => coordinate.data.results[0].geometry.location);
  const coordinatesDTO = `point(${coordinates.lng},${coordinates.lat})`;
  return coordinatesDTO;
};

module.exports = getCoordinates;
