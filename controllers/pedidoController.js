const { response } = require("express");
const schedule = require('node-schedule')
const { requestPrint } = require("../print/bxlcommon");
const { setPosId, checkPrinterStatus, getPosData, printText, cutPaper } = require('../print/pos');
const es = require('date-fns/locale/es')

const Estudiante = require("../models/estudiante");
const Pedido = require("../models/pedido");

const { getDay, format } = require('date-fns');

//Start

let pedidosDisponibles = 600

schedule.scheduleJob('0 5 * * *', () => {
	pedidosDisponibles = 600;
})

schedule.scheduleJob('0 10 * * *', () => {
	pedidosDisponibles = 600;
})

schedule.scheduleJob('0 16 * * *', () => {
	pedidosDisponibles = 600;
})


// Obtener pedidos
const getPedidos = async (req, res = response) => {
	
	const [total, pedido] = await Promise.all([
		Pedido.count(),
		Pedido.findAll()
	])

	res.json({
		total,
		pedido,
	});
};

// Crear pedido

const postPedido = async (req, res = response) => {

	//establecer fechas
	const hoy = new Date()
	const hoyFormat = format(hoy, 'dd/MM/yyyy', { locale: es })
	const datePedido = new Date(Date.now());
	const horaPedido = datePedido.getHours();
	const fechaPedido = datePedido.toDateString();
	const diaPedido = getDay(datePedido); //6 

	// console.log(`DIA DEL PEDIDO es: ${diaPedido}`);

	if (diaPedido == 0 || diaPedido == 6) {
		return res.status(402).json({msg: "No atendemos Sabados o domingos"})
	}

	//funcion registrar pedido
	const registrarPedido = async (turno, id_estudiante, idClient) => {

		// console.log('desde registrarPedido');

		const estudiante = await Estudiante.findByPk(id_estudiante)
		const nombreEstudiante = estudiante.nombre

		//Capitalize
		const arr = nombreEstudiante.split(" ");

		//loop through each element of the array and capitalize the first letter.
		for (let i = 0; i < arr.length; i++) {
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
		}

		//Join all the elements of the array back into a string 
		//using a blankspace as a separator 
		const nombreEstudianteCap = arr.join(" ");

		// console.log(`NOMBRE ESTUDIANTE GAAA = ${nombreEstudiante.nombre}`);
		let turnoString

		switch (turno) {
			case 'D':
				turnoString = "DESAYUNO"
				break;
			case 'A':
				turnoString = "ALMUERZO"
				break;
			case 'C':
				turnoString = "CENA"
				break;
			default:
				break;
		}

		const pedido = new Pedido({ turno, id_estudiante });

		try {
			await pedido.save();
			pedidosDisponibles--;
			let nroPedidoPorTurno = 600 - pedidosDisponibles

			//imprimir ticked
			let issueID = 1;
			setPosId(issueID);
			checkPrinterStatus();
			printText(`UNIVERSIDAD NACIONAL DE HUANCAVELICA`, 0, 0, true, false, false, 0, 1);
			printText(`\nComedor Universitario\n${nombreEstudianteCap}`, 0, 0, false, false, false, 0, 1);
			printText(`\n${turnoString} - #${nroPedidoPorTurno} - `, 0, 0, true, false, false, 0, 1);
			printText(`${hoyFormat}\n\n\n`, 0, 0, false, false, false, 0, 1);
			cutPaper(1)

			let strSubmit = getPosData();

			// console.log(strSubmit);
			issueID++;
			if (idClient == 1) {
				requestPrint('Printer1', strSubmit, () => {
					console.log('exito desde impresora');
				})
			}
			if (idClient == 2) {
				requestPrint('Printer2', strSubmit, () => {
					console.log('exito desde impresora 2');
				})
			}
			//respuesta final
			return res.json({
				msg: "Pedido creado",
				pedidosDisponibles,
				turnoString
			});

		} catch (error) {
			// console.log(error.errors);
			return res.status(408).json({ msg: error.message });
		}
	}

	//validar pedidos disponibles
	if (pedidosDisponibles === 0) {
		return res.status(400).json({ msg: 'Pedidos disponibles = 0' })
	}

	const { id_estudiante, idClient } = req.body;
	// console.log(id_estudiante);

	const regExp = /^[0-9]+$/

	if (!regExp.test(id_estudiante)) {
		return res.status(400).json({ msg: 'Consulta incorrecta' })
	}

	// //establecer estudiante y validar Estudiante existe
	let estudianteID;

	const estudiantebyDNI = await Estudiante.findByPk(id_estudiante)
	if (estudiantebyDNI) {
		estudianteID = estudiantebyDNI.dni
	} else {
		const estudiantebyCM = await Estudiante.findOne({ where: { codigo_matricula: id_estudiante } })
		if (!estudiantebyCM) {
			return res.status(400).json({ msg: 'Estudiante no existe en la BD' })
		}
		estudianteID = estudiantebyCM.dni
		// console.log(`estudiante - ${estudianteID}`);
		if (!estudiantebyCM && !estudiantebyDNI) {
			return res.status(400).json({ msg: 'Estudiante no existe en la BD' })
		}
	}
	//Establecer turno

	let turnoPedido = '';
	const horarioDesayunoInicio = 6;
	const horarioDesayunoFin = 8;

	const horarioAlmuerzoInicio = 11;
	const horarioAlrmuerzoFin = 13;

	const horarioCenaInicio = 17;
	const horarioCenaFin = 19;

	// console.log(horaPedido);

	if (horaPedido >= horarioDesayunoInicio && horaPedido <= horarioDesayunoFin) {
		turnoPedido = 'D'
	} else if (horaPedido >= horarioAlmuerzoInicio && horaPedido <= horarioAlrmuerzoFin) {
		turnoPedido = 'A'
	} else if (horaPedido >= horarioCenaInicio && horaPedido <= horarioCenaFin) {
		turnoPedido = 'C'
	} else {
		turnoPedido = ''
	}
	//true
	if (turnoPedido == '') {
		return res.status(400).json({ msg: 'fuera de horario' });
	}

	// Extraer datos de ultimo pedido

	let datosUltimoPedido = {}
	let ultimoPedido
	let pedidoActual = {
		id_estudiante: estudianteID,
		turno: turnoPedido, //para probar 'A'; turnoPedido
		fecha: fechaPedido
	}

	const fecha_ultimoPedido = await Pedido.max('createdAt', { where: { 'id_estudiante': estudianteID } })
	// console.log('fecha_ultimoPedido99 ' + fechaPedido);

	ultimoPedido = await Pedido.findOne({ where: { createdAt: fecha_ultimoPedido } })

	if (!ultimoPedido) {
		// console.log('primera vez ' + fecha_ultimoPedido);
		return await registrarPedido(pedidoActual.turno, pedidoActual.id_estudiante, idClient)
	}

	// //falsedev
	// if (turnoPedido = '') {
	// 	return res.status(400).json({ msg: 'fuera de horario' });
	// }

	datosUltimoPedido = {
		id_estudiante: ultimoPedido.id_estudiante,
		turno: ultimoPedido.turno,
		fecha: ultimoPedido.createdAt.toDateString()
	}

	// console.log(`Fecha de pedido actual ${pedidoActual.fecha} - Fecha de ultimo pedido ${datosUltimoPedido.fecha}`);

	// console.log('129 - datos del ultimo pedido ' + JSON.stringify(datosUltimoPedido) + ' // datos de pedidoActual ' + JSON.stringify(pedidoActual));

	if (datosUltimoPedido.id_estudiante == pedidoActual.id_estudiante && datosUltimoPedido.turno == pedidoActual.turno && datosUltimoPedido.fecha == pedidoActual.fecha) {
		return res.status(402).json({ msg: 'Pedido procesado anteriormente / igual fecha, usuario y turno' });
	}

	console.log('135 - Registrar pedido que no es primera vez');
	await registrarPedido(pedidoActual.turno, pedidoActual.id_estudiante, idClient)

}

module.exports = {
	getPedidos,
	postPedido,
};
