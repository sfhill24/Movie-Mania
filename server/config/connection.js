const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.DB_NAME, 
    host: process.env.HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER
});

module.exports = sequelize;
