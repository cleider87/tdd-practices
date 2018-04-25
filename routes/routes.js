var User = require('../models/UserModel');
var UserController = require('../business/UserController')(User);

module.exports = function(app){

	app.get('/api/users', UserController.get);
	
	app.post('/api/users', UserController.create);

	app.put('/api/users/:user_id', UserController.update);

	app.delete('/api/users/:user_id', UserController.delete);

}