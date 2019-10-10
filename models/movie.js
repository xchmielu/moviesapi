const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
	},
	year: {
		type: Number,
	},
	runtime: {
		type: String,
	},
});

module.exports = mongoose.model('Movie', movieSchema);
