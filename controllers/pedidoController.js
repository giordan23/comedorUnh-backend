const { response } = require("express");

const Pedido = require("../models/pedido");

const getPedidos = async (req, res = response) => {
	const pedido = await Usuario.findAll();

	res.json(pedido);
};

const postPedido = async (req, res = response) => {
	const body = req.body
	const pedido = new Pedido(body)
	await pedido.save();

	res.json({
		msg: "Pedido creado",

	})
}

module.exports = {
	getPedidos,
	postPedido
};
