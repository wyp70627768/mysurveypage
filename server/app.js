var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var config = require('../config/DB');
var router = require('../router/serverRouter');
// var databaseUrl = 'mongodb://localhost:27017/sprint-survey';

app.use(cors());
app.listen(3000, function () {
	console.log('serve is up and listening on port 3000 ');
});

// deal with database connection
var database = mongoose.connect(config.DB);
database.connection.on('error', function (error) {
	// TODO do something here to catch error.
	console.log('mongodb connection failed!' + error);
}).on('open', function () {
	// TODO do something here to start your business
	console.log('------ database connect succeed ------');
});

app.use('/api', router);

module.exports = app;