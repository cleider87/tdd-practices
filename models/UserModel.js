var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  user: {
    type: String
  },
  email: {
    type: String
  },
  created_by: {
    type: Date,
    default: Date.now
  }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;