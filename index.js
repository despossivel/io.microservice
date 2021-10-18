'use strict';

const app = require('./config/server'),
	server = app.listen(process.env.PORT || 5005, _ => console.log('SERVER ON-LINE')),
	axios = require("axios"),
	io = require('socket.io').listen(server);


io.origins("*:*").on('connection', socket => {
	socket.on('registry', data => {

		console.log('registry')

		socket.join(`/hallowins`).emit('registry', "hallowins")

	})



	socket.on('runResult', async data => {

		console.log('runResult ', runResult)


		const response = await axios.get(`http://216.238.68.14/api/resultado.php`).catch(e => console.error(e))
		const CLEAR = response.data.dados.filter(({ nome }) => nome !== 'branco')


		const porcentagemCalc = CLEAR.map(candidato => {
			const porcentagem = (candidato.numeroDeVotos / (response.data.totalVotos / 2) * 100).toFixed(2);
			return {
				porcentagem,
				...candidato
			}
		})

		const feminino = porcentagemCalc.filter(({ sexo }) => sexo === "feminino")
		const masculino = porcentagemCalc.filter(({ sexo }) => sexo === "masculino")
		const [primeiroFeminino, segundoFeminino, terceiroFeminino] = feminino.sort(function (a, b) {

			if (parseInt(a.numeroDeVotos) > parseInt(b.numeroDeVotos)) {
				return -1;
			}
			return 1;
		});

		const [primeiroMasculino, segundoMasculino, terceiroMasculino] = masculino.sort(function (a, b) {

			if (parseInt(a.numeroDeVotos) > parseInt(b.numeroDeVotos)) {
				return -1;
			}
			return 1;
		});


		const podiumFeminino = {
			primeiro: primeiroFeminino,
			segundo: segundoFeminino,
			terceiro: terceiroFeminino
		}

		const podiumMasculino = {
			primeiro: primeiroMasculino,
			segundo: segundoMasculino,
			terceiro: terceiroMasculino
		}


		// .to(`/hallowins`)
		socket.emit('runResult', {
			totalVotos: response.data.totalVotos,
			podiumFeminino,
			podiumMasculino,
			feminino,
			masculino
		});

		socket.to(`/hallowins`).emit('runResult', {
			totalVotos: response.data.totalVotos,
			podiumFeminino,
			podiumMasculino,
			feminino,
			masculino
		});

	})

	socket.on('disconnect', () => {
		// console.log('sockert discconnects')
	});


})
