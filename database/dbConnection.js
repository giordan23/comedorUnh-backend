const { Sequelize } = require("sequelize");

const db = new Sequelize("comedorunhdb", "root", "root", {
	host: "localhost",
	dialect: "mysql",
});

module.exports = db;
