//Express server set-up
const express = require('express')
const app = express()
const sequelize = require("./config/connection");
require("dotenv").config();
const { DataTypes } = require('sequelize');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));


/******************************************************************MODELS********************************************************************************************** */

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

/******************************************************************ENDPOINTS********************************************************************************************** */

//Vote endpoint
app.put('/movies/:movieId/votes', async (req, res) => {

    try {
        const movieID = req.params.movieId;

        let vote = await Votes.findOne({ where: { movie_id: movieID } });
        if (vote === null) {
            if (req.body.upvotes == true) {
                vote = await Votes.create({ upvotes: 1, movie_id: movieID })
            } else {
                vote = await Votes.create({ downvotes: 1, movie_id: movieID })
            }

        } else {
            if (req.body.upvotes == true) {
                await vote.update({ upvotes: vote.upvotes + 1 })
            } else {
                await vote.update({ downvotes: vote.downvotes + 1 })
            }

            await vote.save();
        }

        res.status(200).json(vote);

    } catch (error) {
        res.status(500).json(error);
    }
});

//Get Votes By Movieid 

app.get('/movies/:movieId/votes', async (req, res) => {
    try {
        const movieID = req.params.movieId;

        const vote = await Votes.findOne({ where: { movie_id: movieID } });
        if (vote == null) {
            res.status(404).json("No votes found for this movie id.");
            return;
        }

        res.status(200).json(vote);

    } catch (error) {
        res.status(500).json(error);
    }


});



/******************************************************************SEQUELIZE CONNECTION******************************************************************************************************** */

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false }).then(() => {
    app.listen(3001, () => console.log("Now Listening!"));
});