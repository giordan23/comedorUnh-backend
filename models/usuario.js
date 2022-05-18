const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Usuario = db.define("Usuario", {
	username: {
		type: DataTypes.STRING,
	},
	nombre: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.TINYINT,
	},
	
	// dni: {
	// 	type: DataTypes.STRING,
	// },
	// codigo_matricula: {
	// 	type: DataTypes.STRING,
	// },
	
});

module.exports = Usuario;

