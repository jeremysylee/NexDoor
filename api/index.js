const { app } = require('./server');

const port = 3500;

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});
