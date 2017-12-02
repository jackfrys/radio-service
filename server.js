var app = require('./express');

var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var express = app.express;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require("./app/app.js");

port = process.env.PORT || 3000;
app.listen(port);