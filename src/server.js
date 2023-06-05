require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('database synced'))
  .catch((err) => console.log(err));

//va a ser la ultima parte del codigo

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}! 🐱‍🐉`);
});
