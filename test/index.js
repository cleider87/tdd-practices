var assert = require('chai').assert;

describe('Channels', function () {
    describe('#get()', function () {
        it('Should get all channels without error', function (done) {
            channelsDB.getChannels(function (error, channels) {
                assert.isAtLeast(channels.length, 3);
                done();
            })
        })
    })
})