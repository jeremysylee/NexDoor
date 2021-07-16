const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// const { auth } = require('express-openid-connect');
const router = require('./router');
require('dotenv').config();

const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

// const config = {
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUER_BASE_URL,
//   secret: process.env.SECRET,
//   idpLogout: true,
//   authRequired: false,
// };

// app.use(auth(config));

app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));
