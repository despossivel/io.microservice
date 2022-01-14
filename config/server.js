'use strict';

const express = require('express'),
     consign = require('consign'),
     bodyParser = require('body-parser'),
     cors = require('cors'),
     path = require('path'),
     app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../server/views'));

app.use('/static', express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

consign().include('./server/routes')
     .then('server/controllers')
     .into(app);

module.exports = app;