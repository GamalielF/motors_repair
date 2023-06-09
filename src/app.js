const cors = require('cors');
const express = require('express');
//routes
const userRouter = require('./routes/users.routes');
const repairsRouter = require('./routes/repairs.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = app;
