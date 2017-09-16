var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  pswd: {type: String, required: true}
});
userSchema.plugin(uniqueValidator)
var User = mongoose.model('users', userSchema, 'users');

function login(req, res, next) {
  var query = req.body
  var login = query.username
  var pswd = query.pswd
  User.findOne({ username: login , pswd:pswd}, 'username', function (err, user) {
    if (err) {
        res.status(400)
    } else {
        res.status(200).send(user)
    }    
  })

}

function signup(req, res, next) {
  var query = req.body
  var login = query.usr
  var pswd = query.pswd
  try{
    var user_entry = new User({
      username: login,
      pswd: pswd
    })
    user_entry.save(function (err) {
      if (err) {
          res.status(400)
      } else {
          res.status(200)
      }
    });
  }
  catch (err) {
    res.json({err: true, res: null})
  }
}

module.exports = {login, signup}
