/* eslint-disable */
const express = require('express');
const mongoose = require('mongoose');

const { DB_ADDRESS } = require('./utils/constants');
const routes = require('./routes/index.js');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB_ADDRESS || DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});