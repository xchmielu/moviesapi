let mongoose = require('mongoose');
let Comment = require('../models/comment');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Comment', () => {
	beforeEach(done => {
		Comment.remove({}, err => {
			done();
		});
	});

	describe('/GET comments', () => {
		it('it should GET all the comments', done => {
			chai
				.request(server)
				.get('/comments')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST comments', () => {
		it('it should not POST a comment with no movie filed', done => {
			let comment = {
				comment: 'Awesome work!',
			};
			chai
				.request(server)
				.post('/comments')
				.set('content-type', 'application/x-www-form-urlencoded')
				.send(comment)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					done(err);
				});
		});
		it('it should not POST a comment, beacuse Wonder Women is not added to database', done => {
			let comment = {
				comment: 'Awesome work!',
				movie: 'Wonder Women',
			};
			chai
				.request(server)
				.post('/comments')
				.set('content-type', 'application/x-www-form-urlencoded')
				.send(comment)
				.end((err, res) => {
					res.should.have.status(404);
					res.body.should.be.a('object');
					res.body.should.have.property('error');
					done();
				});
		});
	});
	it('it should POST a comment', done => {
		let comment = {
			comment: 'Awesome work!',
			movie: 'Batman',
		};
		chai
			.request(server)
			.post('/comments')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send(comment)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('content');
				res.body.should.have.property('movie');
				done();
			});
	});
});
