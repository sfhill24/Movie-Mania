//Express server set-up
const path = require('path');
const express = require('express')
const app = express()
const routes = require("./controllers/voteRoutes");
const sequelize = require("./config/connection");
require("dotenv").config();
const cors = require('cors'); 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//added CORS to be able to make requests from the browser
app.use(cors({
    origin: process.env.ORIGIN
}));

const PORT = process.env.PORT || 3001;

//informs server to use routes
app.use(routes);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//checks sequelize connection to datatbase
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now Listening!"));
});