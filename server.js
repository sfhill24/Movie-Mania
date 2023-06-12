//Express server set-up
const express = require('express')
const app = express()

const { Sequelize } = require('sequelize');

app.get('/', function (req, res) {
    res.send('Hello World')
})

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'movie_mania_db',
    host: 'localhost',
    password: 'password',
    username: 'root'
});


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => console.log("Now Listening!"));
});