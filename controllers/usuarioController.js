const { response } = require("express");

const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const getUsuarios = async (req, res = response) => {
	const usuarios = await Usuario.findAll();

	res.json(usuarios);
};

const getUsuario = async (req, res = response) => {
	
	const {id} = req.params;
	
	const usuarios = await Usuario.findByPk(id);

	res.json(usuarios);
};

const postUsuario = async (req, res = response) => {


	const { username, nombre, password, status } = req.body
	const usuario = new Usuario({ username, nombre, password, status })

	//verificar si username existe
	const usernameExiste = await Usuario.findOne({ username })
	if (usernameExiste) {
		return res.status(400).json({
			msg: `El usuario ${username} ya esta registrado`
		})
	}


	//encriptar password
	const salt = bcryptjs.genSaltSync()
	usuario.password = bcryptjs.hashSync(password, salt)

	await usuario.save();

	return res.json({
		msg: "Usuario creado",
	})
}

const updateUsuario = async (req, res = response) => {

	const {id} = req.params
	const { username, nombre, password, status } = req.body
	const usuario = new Usuario({ username, nombre, password, status })

	//verificar si username existe
	const usernameExiste = await Usuario.findOne({ username })
	if (usernameExiste) {
		return res.status(400).json({
			msg: `El usuario ${username} ya esta registrado`
		})
	}


	//encriptar password
	const salt = bcryptjs.genSaltSync()
	usuario.password = bcryptjs.hashSync(password, salt)

	await usuario.save();

	return res.json({
		msg: "Usuario creado",
	})
}

const deleteUsuario = async (req, res = response) => {

	const {id} = req.params

	const { username, nombre, password, status } = req.body
	const usuario = new Usuario({ username, nombre, password, status })

	//verificar si username existe
	const usernameExiste = await Usuario.findOne({ username })
	if (usernameExiste) {
		return res.status(400).json({
			msg: `El usuario ${username} ya esta registrado`
		})
	}


	//encriptar password
	const salt = bcryptjs.genSaltSync()
	usuario.password = bcryptjs.hashSync(password, salt)

	await usuario.save();

	return res.json({
		msg: "Usuario creado",
	})
}

module.exports = {
	getUsuarios,
	postUsuario
};
