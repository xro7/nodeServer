var express = require('express');
var connect = require('connect');
var app = express();
var router = require('./router');

app.use(express.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());

var server = app.listen(8080,function  () {
	console.log("server listening to port 8080");
});

router(app);

var numUsers;
var names = {};

var config = require('./config')

var io = require('socket.io')(server);


io.on('connection', function (socket) {
	
	config.initgame(io,socket);
});

