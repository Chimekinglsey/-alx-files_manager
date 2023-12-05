// import { express } from 'express';
const express = require('express');
const indexRoute = require('./routes/index');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use('/', indexRoute);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));

module.exports = app;
