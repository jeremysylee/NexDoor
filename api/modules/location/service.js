const db = require('../../db');

const locationService = {
  addAddress: async ({
    streetAddress,
    city,
    state,
    zipcode,
    neighborhood,
    coordinates,
  }) => {
    const queryStr = `
      WITH X AS (
        INSERT INTO nexdoor.address
        (
          street_address,
          city,
          state,
          zipcode,
          neighborhood,
          coordinate
        )
        VALUES
        (
          '${streetAddress}',
          '${city}',
          '${state}',
          ${zipcode},
          '${neighborhood}',
          ${coordinates}
        )
      RETURNING address_id
    )`;
    await db.query(queryStr);
  },

  getAddress: async ({ streetAddress, zipcode }) => {
    const queryStr = `
      SELECT address_id
      FROM nexdoor.address
      WHERE street_address='${streetAddress}'
      AND zipcode=${zipcode}
    `;
    const address = await db.query(queryStr);
    const addressDTO = address.rows[0];
    return addressDTO || false;
  },
};

module.exports = locationService;
