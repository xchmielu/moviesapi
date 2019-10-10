if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');
const commentsRouter = require('./routes/comments');

const PORT = 3000 || process.env.PORT;

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);
app.use('/comments', commentsRouter);

app.listen(PORT, () => console.log(`Server listen on ${PORT}`));

module.exports = app;
