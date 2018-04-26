process.env.NODE_ENV = 'test';

var chai = require('chai');

var chaiHttp = require('chai-http');

var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Routes TestCases', function () {

    describe('/api/users', function () {
        it('Responds with status 200', function (done) {
            chai.request(app)
                    .get('/api/users')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
        });

        it('Responds with status 404', function (done) {
            chai.request(app)
                    .get('/api/user')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
        });

    });

});
