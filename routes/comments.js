const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
	try {
		const commentList = await Comment.find({});
		res.status(200).json(commentList);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:movie', async (req, res) => {
	try {
		const movieTitle = req.params.movie.toLowerCase();
		await Comment.find({ movie: movieTitle }, (err, movie) => {
			res.status(201).json(movie);
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', (req, res) => {
	const commentRequest = req.body.comment || '';
	const movieRequest = req.body.movie || '';

	const comment = new Comment({
		content: commentRequest,
		movie: movieRequest.toLowerCase(),
	});

	Movie.findOne({ title: movieRequest.toString() }, (err, movie) => {
		try {
			if (movie == null) {
				res.status(404).json({ error: `Movie doesn't exist at database` });
			} else {
				comment.save();
				res.status(201).json(comment);
			}
		} catch {
			if (err) res.status(500).json({ errors: err });
		}
	});
});

module.exports = router;
