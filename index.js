'use strict';

const app = require('./config/server'),
	server = app.listen(5555, _ => console.log('SERVER ON-LINE')),
	axios = require("axios"),
	io = require('socket.io').listen(server);


var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '216.238.68.1122',
	user: 'root',
	password: 'MySql2019!',
	database: 'testedb'
});



connection.connect();


io.origins("*:*").on('connection', socket => {


	socket.on('registry', data => {

		console.log('registry')

		socket.join(`/hallowins`).emit('registry', "hallowins")

	})



	socket.on('runResult', async data => {

		console.log('runResult ')



		// .to(`/hallowins`)
		socket.emit('runResult', {});

		socket.to(`/hallowins`).emit('runResult', {});


		// connection.end();



	})

	socket.on('disconnect', () => {
		console.log('sockert discconnects')
	});


})
