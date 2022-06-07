const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Usuario = db.define("Usuario", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.TINYINT,
		defaultValue: 1
	},
});

module.exports = Usuario;

