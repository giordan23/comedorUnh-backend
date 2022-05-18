const { response } = require("express");

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {
	const usuarios = await Usuario.findAll();

	res.json(usuarios);
};

module.exports = {
	getUsuarios,
};
