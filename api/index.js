const { app } = require('./app');

const port = 3500;

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});
