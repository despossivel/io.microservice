'use strict';

const app = require('./config/server'),
	server = app.listen(process.env.PORT || 5005, _ => console.log('SERVER ON-LINE')),
	axios = require("axios"),
	io = require('socket.io').listen(server);



// 	  'mysqlsrv',
//   'root',
//   'MySql2019!',
//   'testedb',
//   '3306'
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '216.238.68.14',
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


		// const response = await axios.get(`http://216.238.68.14/api/resultado.php`).catch(e => console.error(e))



		connection.query('SELECT count(votos.votos) AS numeroDeVotos, candidatos.* 	FROM votos 	RIGHT JOIN candidatos ON votos.idCandidato = candidatos.id	GROUP BY candidatos.id 	ORDER BY candidatos.nome DESC', function (error, results, fields) {
			if (error) throw error;

			connection.query('SELECT * FROM votos', function (errorVotos, resultsVotos, fieldsVotos) {

				const response = results,
					totalVotos = resultsVotos.length,
					CLEAR = response.filter(({ nome }) => nome !== 'branco'),
					porcentagemCalc = CLEAR.map(candidato => {
						const porcentagem = (candidato.numeroDeVotos / (totalVotos / 2) * 100).toFixed(2);
						return {
							porcentagem,
							...candidato
						}
					}),
					feminino = porcentagemCalc.filter(({ sexo }) => sexo === "feminino"),
					masculino = porcentagemCalc.filter(({ sexo }) => sexo === "masculino"),
					[primeiroFeminino, segundoFeminino, terceiroFeminino] = feminino.sort(function (a, b) {

						if (parseInt(a.numeroDeVotos) > parseInt(b.numeroDeVotos)) {
							return -1;
						}
						return 1;
					}),
					[primeiroMasculino, segundoMasculino, terceiroMasculino] = masculino.sort(function (a, b) {

						if (parseInt(a.numeroDeVotos) > parseInt(b.numeroDeVotos)) {
							return -1;
						}
						return 1;
					});


				const podiumFeminino = {
					primeiro: primeiroFeminino,
					segundo: segundoFeminino,
					terceiro: terceiroFeminino
				},
					podiumMasculino = {
						primeiro: primeiroMasculino,
						segundo: segundoMasculino,
						terceiro: terceiroMasculino
					}


				// .to(`/hallowins`)
				socket.emit('runResult', {
					totalVotos: totalVotos,
					podiumFeminino,
					podiumMasculino,
					feminino,
					masculino
				});

				socket.to(`/hallowins`).emit('runResult', {
					totalVotos: totalVotos,
					podiumFeminino,
					podiumMasculino,
					feminino,
					masculino
				});

			});

			connection.end();



		})
	})

	socket.on('disconnect', () => {
		// console.log('sockert discconnects')
	});


})
