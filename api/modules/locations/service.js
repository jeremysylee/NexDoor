const db = require('../../db');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const locationService = {
  addAddress: async ({
    streetAddress,
    city,
    state,
    zipcode,
    neighborhood,
    coordinates,
  }) => {
    if (!streetAddress || !city || !state || !zipcode || !coordinates) {
      throw new ApiError('Undefined address / coordinates!', httpStatusCodes.BAD_REQUEST);
    }
    const queryStr = `
      INSERT INTO nexdoor.address (
        street_address,
        city,
        state,
        zipcode,
        neighborhood,
        coordinate
      )
      VALUES (
        '${streetAddress}',
        '${city}',
        '${state}',
        ${zipcode},
        '${neighborhood}',
        ${coordinates}
      )
      RETURNING address_id
    `;
    const data = await db.query(queryStr);
    const addressIdDTO = data.rows[0];
    return addressIdDTO;
  },

  getAddress: async (body) => {
    const {
      streetAddress,
      zipcode,
    } = body;

    const queryStr = `
      SELECT address_id
      FROM nexdoor.address
      WHERE street_address='${streetAddress}'
      AND zipcode=${zipcode}
    `;
    const address = await db.query(queryStr);
    const addressIdDTO = address.rows[0];
    return addressIdDTO || false;
  },
};

module.exports = locationService;
