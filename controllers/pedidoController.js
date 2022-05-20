const { response } = require("express");
const Estudiante = require("../models/estudiante");

const Pedido = require("../models/pedido");

const getPedidos = async (req, res = response) => {
	const pedido = await Pedido.findAll();
	res.json(pedido);
};

const postPedido = async (req, res = response) => {

	//establecer fechas
	const datePedido = new Date(Date.now());
	const horaPedido = datePedido.getHours();
	const fechaPedido = datePedido.toDateString();

	// const diaPedido = datePedido.getDay(); //20
	// const 

	// let pedidosDisponibles = 0


	//funcion registrar pedido
	const registrarPedido = async (turno, id_estudiante) => {

		// console.log('desde registrarPedido');

		const pedido = new Pedido({ turno, id_estudiante });

		try {
			await pedido.save();
			// pedidosDisponibles--;
			return res.json({
				msg: "Pedido creado",
				// pedidosDisponibles
			});

		} catch (error) {
			// console.log(error.errors);
			return res.status(400).json({ msg: error.message });
		}
	}

	const { id_estudiante } = req.body;
	// console.log(id_estudiante);

	const regExp = /^[0-9]+$/

	if (!regExp.test(id_estudiante)) {
		return res.status(400).json({ msg: 'Consulta incorrecta' })
	}

	// if (pedidosDisponibles == 0) {
	// 	return res.status(400).json({ msg: 'Pedidos disponibles = 0' })
	// }

	let estudianteID;

	// //establecer estudiante y validar Estudiante existe
	const estudiantebyDNI = await Estudiante.findByPk(id_estudiante)
	if (estudiantebyDNI) {
		estudianteID = estudiantebyDNI.dni
	} else {
		const estudiantebyCM = await Estudiante.findOne({ where: { codigo_matricula: id_estudiante } })
		estudianteID = estudiantebyCM.dni
		// console.log(`estudiante - ${estudianteID}`);
		if (!estudiantebyCM && !estudiantebyDNI) {
			return res.status(400).json({ msg: 'Estudiante no existe en la BD' })
		}
	}

	//Establecer turno


	// console.log("Date pedido para DB " + datePedido);
	// console.log("fecha pedido para DB " + fechaPedido);

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
		turno: 'A', //para probar 'A'; turnoPedido
		fecha: fechaPedido
	}

	const fecha_ultimoPedido = await Pedido.max('createdAt', { where: { 'id_estudiante': estudianteID } })
	console.log('fecha_ultimoPedido99 ' + fechaPedido);

	ultimoPedido = await Pedido.findOne({ where: { createdAt: fecha_ultimoPedido } })

	if (!ultimoPedido) {

		console.log('primera vez ' + fecha_ultimoPedido);
		return await registrarPedido(pedidoActual.turno, pedidoActual.id_estudiante)

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

	console.log(`Fecha de pedido actual ${pedidoActual.fecha} - Fecha de ultimo pedido ${datosUltimoPedido.fecha}`);

	console.log('129 - datos del ultimo pedido ' + JSON.stringify(datosUltimoPedido) + ' // datos de pedidoActual ' + JSON.stringify(pedidoActual));

	if (datosUltimoPedido.id_estudiante == pedidoActual.id_estudiante && datosUltimoPedido.turno == pedidoActual.turno && datosUltimoPedido.fecha == pedidoActual.fecha) {
		return res.status(400).json({ msg: 'Pedido procesado anteriormente / igual fecha, usuario y turno' });
	}

	console.log('135 - Registrar pedido que no es primera vez');
	await registrarPedido(pedidoActual.turno, pedidoActual.id_estudiante)


}

module.exports = {
	getPedidos,
	postPedido,
};
