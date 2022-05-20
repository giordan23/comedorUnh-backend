const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Pedido = db.define("Pedido", {
	id_estudiante: {
		type: DataTypes.INTEGER,
	},
	turno: {
		type: DataTypes.CHAR,
		validate: {
			isIn: {
				args: [["A", "D", "C"]],
				msg: "El valor ingresado no es valido",
			},
		},
	},
});

module.exports = Pedido;
