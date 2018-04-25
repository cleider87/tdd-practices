"use strict";

var UserController = function(User){

	var UserObj = {};

	UserObj.create = function(req, res, next){
		var newUser = new User(req.body);
		newUser.save(function(err, user){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, user: user});
		});
	}

	UserObj.get = function(req, res, next){
		User.find(function(err, users){
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, user: users});
		});
	}

	UserObj.update = function(req, res, next){
		var completed = req.body.completed;
		User.findById(req.params.user_id, function(err, user){
			user.completed = completed;
			user.save(function(err, user){
				if(err) {
					res.json({status: false, error: "Status not updated"});
				}
				res.json({status: true, message: "Status updated successfully"});
			});
		});
	}

	UserObj.delete = function(req, res, next){
		User.remove({_id : req.params.user_id }, function(err, user){
			if(err) {
				res.json({status: false, error: "Deleting User is not successfull"});
			}
			res.json({status: true, message: "User deleted successfully"});
		});
	}

	return UserObj;
}

module.exports = UserController;