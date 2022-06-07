const Pedido = require("../models/Pedido");

const getReporte = async (req, res = response) => {
	const pedidos = await Pedido.findAll();

	res.json(pedidos);
};

module.exports = {
	getReporte
};
