let mongoose = require('mongoose');
let Movie = require('../models/movie');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Movies', () => {
	before(done => {
		Movie.remove({}, err => {
			done();
		});
	});

	describe('/GET movies', () => {
		it('it should GET all the movies', done => {
			chai
				.request(server)
				.get('/movies')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST movies', () => {
		it('it should not POST a movie with empty movie field', done => {
			let movie = {
				movie: '',
			};
			chai
				.request(server)
				.post('/movies')
				.set('content-type', 'application/x-www-form-urlencoded')
				.send(movie)
				.end((err, res) => {
					res.should.have.status(500);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					done();
				});
		});

		it('it should POST a movie ', done => {
			let movie = {
				movie: 'Batman',
			};
			chai
				.request(server)
				.post('/movies')
				.set('content-type', 'application/x-www-form-urlencoded')
				.send(movie)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('title');
					res.body.should.have.property('year');
					res.body.should.have.property('runtime');
					done();
				});
		});
	});
});
