const path = require('path');
const client = require('./index');

const seedCSV = (table) => {
  const source = path.join(__dirname, `../data/${table}.csv`);

  client.query(
    `COPY nexdoor.${table}
    FROM '${source}'
    DELIMITER ',';`,
  )
    .then(() => console.log('seeded successfully'))
    .catch((err) => console.log('err', err));
};

seedCSV('users');
