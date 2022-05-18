const express = require("express");
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");

const db = require("../database/dbConnection");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//routes
		this.usuariosRoutePath = "/api/usuarios";

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
		this.app.use(this.usuariosRoutePath, userRoutes);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto", this.port);
		});
	}
}

module.exports = Server;
