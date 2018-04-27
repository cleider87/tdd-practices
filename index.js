var config = require('./config/config');
var morgan = require('morgan');
var server=require('./server');

var db;

//var opbeat = require('opbeat').start({
//    appId: 'a33e4ef166',
//    organizationId: '1d9b808c793c4921b18827adafffc55a',
//    secretToken: '1e2e8893353e1b58b9303e80369482034147447c'
//})

if (process.env.NODE_ENV === "test") {
    server.listen(config.test_db, function (err) {
        if (err)
            throw err;
        console.log("Testing App on port " + config.test_port);
    });
} else {
    server.use(morgan('dev'));
    server.listen(config.port, function (err) {
        if (err)
            throw err;
        console.log("App listening on port " + config.port);
    });
}
//server.use(opbeat.middleware.express());
