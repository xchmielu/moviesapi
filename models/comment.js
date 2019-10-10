const mongoose = require('mongoose');
const Movie = require('../models/movie');

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		minlength: 1,
	},
	movie: {
		type: String,
		required: true,
		minlength: 1,
	},
});

module.exports = mongoose.model('Comment', commentSchema);
