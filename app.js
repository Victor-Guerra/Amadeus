const express = require('express');
const app = express();

const { Wit, log } = require('node-wit');
const bodyparser = require('body-parser');

const cors = require('cors');
app.use(cors());

const apiRoute = require('./routes');

app.use(bodyparser.json());
app.use(bodyparser.text());

app.use('/api', apiRoute);

module.exports = app;
