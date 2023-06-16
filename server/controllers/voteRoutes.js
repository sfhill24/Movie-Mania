const app = require("express").Router();
const Votes = require("../models/Votes");

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

module.exports = app;
