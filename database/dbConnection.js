const { Sequelize } = require("sequelize");

const db_name = process.env.DBNAME;
const db_user = process.env.DBUSER;
const db_password = process.env.DBPASSWORD;

const db = new Sequelize(db_name, db_user, db_password, {
	host: "localhost",
	dialect: "mysql",
});

module.exports = db;
