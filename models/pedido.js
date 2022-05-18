const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Pedido = db.define("Pedido", {
	
	id_estudiante: {
		type: DataTypes.INTEGER,
	},
	turno: {
		type: DataTypes.ENUM(["D","A","C"]),
	},
	

	
});

module.exports = Pedido;