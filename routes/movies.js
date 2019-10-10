if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const axios = require('axios');

const router = express.Router();
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
	try {
		const moviesList = await Movie.find({});
		res.status(200).json(moviesList);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:title', async (req, res) => {
	try {
		const title = req.params.title.toLowerCase();
		await Movie.find({ title: title }, (err, movie) => {
			res.status(201).json(movie);
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', (req, res) => {
	const movieRequest = req.body.movie || '';

	axios.get(`http://www.omdbapi.com/?t=${movieRequest}&apikey=${process.env.APIKEY}`).then(data => {
		const title = data.data.Title.toLowerCase();
		const year = data.data.Year;
		const runtime = data.data.Runtime;

		const movie = new Movie({
			title,
			year,
			runtime,
		});

		movie.save((error, movie) => {
			if (error) res.status(500).json(error);
			res.status(201).json(movie);
		});
	});
});

module.exports = router;
