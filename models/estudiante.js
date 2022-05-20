const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Estudiante = db.define("Estudiante", {
	nombre: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.TINYINT,
	},
	dni: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	codigo_matricula: {
		type: DataTypes.STRING,
	},
	
});

module.exports = Estudiante;