require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = require('./app');
const db = require('./db');

db.connect().then(() => {
  app.listen(PORT);
  console.log('App listening to port ' + PORT);
});
