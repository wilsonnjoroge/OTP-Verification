require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');


mongoose.connect(process.env.MONGODB_URL_LOCAL).then(() => {console.log('Connected to Db')})
  .catch((err) => {console.log('Connection failed', err)});

  const port = process.env.PORT ||3001

  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });