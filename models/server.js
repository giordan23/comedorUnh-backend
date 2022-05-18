const express = require("express");
const cors = require("cors");

const userRoutes = require('../routes/userRoutes')

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//routes
		this.usuariosRoutePath = "/api/usuarios";

		// Middlewares
		this.middlewares();

        
		this.routes();
	}
    
	middlewares() {
        //directorio public
		this.app.use(express.static("public"));
        //cors
		this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json())
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
