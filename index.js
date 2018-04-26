var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config/config');
var cors = require('cors');
var app = express();

var opbeat = require('opbeat').start({
    appId: 'a33e4ef166',
    organizationId: '1d9b808c793c4921b18827adafffc55a',
    secretToken: '1e2e8893353e1b58b9303e80369482034147447c'
})

app.use(morgan('dev'));                                         // log every request to the console
app.use(cors());
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.use(opbeat.middleware.express());

require('./routes/routes')(app);

var db;

if (process.env.NODE_ENV === "test") {
    db = mongoose.connect(config.test_db);
    app.listen(config.test_port, function (err) {
        if (err)
            throw err;
        console.log("App listening on port " + config.test_port);
    });
} else {
    db = mongoose.connect(config.db);
    app.listen(config.port, function (err) {
        if (err)
            throw err;
        console.log("App listening on port " + config.port);
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + config.db);
    });
}
module.exports = app;
