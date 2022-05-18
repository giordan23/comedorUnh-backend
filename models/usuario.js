const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Usuario = db.define("Usuario", {
	nombre: {
		type: DataTypes.STRING,
	},
	password: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.TINYINT,
	},
});

module.exports = Usuario;

