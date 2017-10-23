const assert   = require("assert");
const shortKey    = require('../server/routes/shortKey');

const chai 	 = require('chai');
const chaiHttp = require('chai-http');
const should 	 = chai.should();
chai.use(chaiHttp);

const server   = require('../server.js');

describe("short url", () => {
	//!\ TEST :
	// - functions
	describe("shortKey functions", () => {
		it("Should have functions: request", () => {
			assert.equal(typeof shortKey.generate_short_code, 'function');
		});
	});
	//!\ TEST :
	// - implementations
	describe("generating short key implementation", () => {
		//!\ TEST - successful responding:
		// - new key
		it("Should have new key as random string", (done) => {
			chai.request(server)
            	.get('/api/generateShortCode')
            	.send()
            	.end((err, res) => {
            		res.body.should.be.a('object');
            		res.body.should.have.property('newKey');
            		done();
	            });
		});
	});
});

