"use strict";

var should = require('should'),
        sinon = require('sinon'),
        mongoose = require('mongoose');
require('sinon-mongoose');

var chai = require('chai');
var expect = chai.expect;

var UserModel = require('../../models/UserModel');

describe('UserController TestCases', function () {

    describe('Create User', function () {
        it('Should call create user', function () {
            var saveStub = sinon.stub();

            function UserTest() {
                this.save = saveStub
            }

            var req = {
                body: {
                    user: "Herrera Cleider",
                    email: "cleider87@gmail.com"
                }
            }
            var res = {}, next = {};
            var UserController = require('../../business/UserController')(UserTest);
            UserController.create(req, res, next);
            sinon.assert.calledOnce(saveStub);
        });

        it('Should save an User', function (done) {
            var userMock = sinon.mock(new UserModel({
                user: "Herrera Cleider",
                email: "cleider87@gmail.com"
            }));

            var user = userMock.object;
            var expectedResult = {status: true};
            userMock.expects('save').yields(null, expectedResult);

            user.save(function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });

        it("Should return error, if post not saved", function (done) {
            var userMock = sinon.mock(new UserModel({
                user: "Herrera Cleider",
                email: "cleider87@gmail.com"
            }));

            var user = userMock.object;
            var expectedResult = {status: false};
            userMock.expects('save').yields(expectedResult, null);

            user.save(function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });

    describe('List Users', function () {
        it('Should call find once', function (done) {
            var userMock = sinon.mock(UserModel);
            var expectedResult = {status: true, user: []};

            userMock.expects('find').yields(null, expectedResult);

            UserModel.find(function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });

        it("Should return error", function (done) {
            var userMock = sinon.mock(UserModel);
            var expectedResult = {status: false, error: "Something went wrong"};

            userMock.expects('find').yields(expectedResult, null);

            UserModel.find(function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });

    describe('Update an User', function () {
        it('Should update the user with new value', function (done) {
            var userMock = sinon.mock(new UserModel({
                user: "Herrera Cleider",
                email: "cleider87@gmail.com"
            }));
            var User = userMock.object;
            var expectedResult = {status: true};

            userMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);

            User.save({_id: 12345}, function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });

        it("Should return error if update action is failed", function (done) {
            var userMock = sinon.mock(new UserModel({
                user: "Herrera Cleider",
                email: "cleider87@gmail.com"
            }));
            var User = userMock.object;
            var expectedResult = {status: false};

            userMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);

            User.save({_id: 12345}, function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });

    });

    describe('Delete an User', function () {
        it('Should delete user of gived id', function (done) {
            var userMock = sinon.mock(UserModel);
            var expectedResult = {status: true};
            userMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
            UserModel.remove({_id: 12345}, function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });

        it("Should return error if delete action is failed", function (done) {
            var userMock = sinon.mock(UserModel);
            var expectedResult = {status: false};
            userMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
            UserModel.remove({_id: 12345}, function (err, result) {
                userMock.verify();
                userMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });
});