var expect = require('chai').expect;

var User = require('../../models/UserModel');

describe('UserModel TestCase', function() {
    it('Should throw error by user empty', function(done) {
        var user = new User();
        user.validate(function(err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });
    it('Should throw error by email empty', function(done) {
        var user = new User();
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});