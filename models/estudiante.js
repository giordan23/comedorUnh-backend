const { DataTypes } = require("sequelize");
const db = require("../database/dbConnection");

const Pedido = require("./pedido");

const Estudiante = db.define("Estudiante", {
  nombre: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.TINYINT,
  },
  dni: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  codigo_matricula: {
    type: DataTypes.STRING,
  },
});

Estudiante.hasMany(Pedido, {
  foreignKey: {
    name: "id_estudiante",
    allowNull: false,
  },
});

Pedido.belongsTo(Estudiante, {
	foreignKey: {
	  name: "id_estudiante",
	  allowNull: false,
	},
  });

module.exports = Estudiante;
