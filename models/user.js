const { Model, Datatypes, Sequelize } = require("sequelize");

const User = Sequelize.define("user", {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Datatypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    }
});




module.export = user;