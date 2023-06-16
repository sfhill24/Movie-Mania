
const { DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

//Vote schema
const Votes = sequelize.define("votes", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    upvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    downvotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Votes;