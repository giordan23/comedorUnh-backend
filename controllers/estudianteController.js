const { response } = require("express");

const Estudiante = require("../models/estudiante");

const getEstudiantes = async (req, res = response) => {
	const estudiantes = await Estudiante.findAll();

	res.json(estudiantes);
};

const postEstudiante = async (req, res = response) => {
	const {dni, codigo_matricula, nombre, status} = req.body
	const estudiante = new Estudiante({dni, codigo_matricula, nombre, status})
	await estudiante.save();

	res.json({
		msg: "Estudiante creado",

	})
}

module.exports = {
	getEstudiantes,
	postEstudiante
};
