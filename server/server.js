//Express server set-up
const express = require('express')
const app = express()
const routes = require("./controllers/voteRoutes");
const sequelize = require("./config/connection");
require("dotenv").config();
const { DataTypes } = require('sequelize');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));

app.use(routes);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: true }).then(() => {
    app.listen(3001, () => console.log("Now Listening!"));
});