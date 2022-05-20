const { response } = require("express");

const Pedido = require("../models/pedido");

const getPedidos = async (req, res = response) => {
	const pedido = await Pedido.findAll();

	res.json(pedido);
};

const postPedido = async (req, res = response) => {
	const { id_estudiante, turno } = req.body;
	const turnoUP = turno.toUpperCase();
	const pedido = new Pedido({turno:turnoUP, id_estudiante});
	try {
		await pedido.save();
		return res.json({
			msg: "Pedido creado",
		});
	} catch (error) {
		console.log(error.errors);
		return res.status(400).json({msg: error.message});
	}
	
};

module.exports = {
	getPedidos,
	postPedido,
};
