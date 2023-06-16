const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = null;

if (process.env.JAWSDB_URL != null) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
}
else {
    sequelize = new Sequelize({
        dialect: 'mysql',
        database: process.env.DB_NAME,
        host: process.env.HOST,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USER
    });
}

module.exports = sequelize;
