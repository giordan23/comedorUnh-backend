const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("../routes/usuarioRoutes");
const pedidoRoutes = require("../routes/pedidoRoutes");
const estudianteRoutes = require("../routes/estudianteRoutes");
const reporteRoutes = require("../routes/reporteRoutes");
const authRoutes = require("../routes/authRoutes");

const db = require("../database/dbConnection");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//routes
		this.usuariosRoutePath = "/api/usuarios";
		this.pedidoRoutesPath = "/api/pedidos"
		this.estudianteRoutesPath = "/api/estudiantes"
		this.reportesRoutesPath = "/api/reportes"
		this.authRoutesPath = "/api/auth"

		// Middlewares
		this.dbConnection();

		this.middlewares();

		this.routes();
	}

	async dbConnection() {
		try {
			await db.authenticate();
			console.log("Database online");
		} catch (error) {
			throw new Error(error);
		}	
	}

	middlewares() {
		//directorio public
		this.app.use(express.static("public"));
		//cors
		this.app.use(cors());
		//lectura y parseo del body
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this.usuariosRoutePath, usuarioRoutes);
		this.app.use(this.pedidoRoutesPath, pedidoRoutes);
		this.app.use(this.estudianteRoutesPath, estudianteRoutes);
		this.app.use(this.reportesRoutesPath, reporteRoutes)
		this.app.use(this.authRoutesPath, authRoutes)
		
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto", this.port);
		});
	}
}

module.exports = Server;
