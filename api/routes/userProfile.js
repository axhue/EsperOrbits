var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  sync: {type: Number, default: 0}
});
userSchema.plugin(uniqueValidator)
var userProfile = mongoose.model('userProfiles', userSchema, 'userProfiles');

// PUT
function updatesync(req, res, next) {
    query = req.body
    userProfile.findOneAndUpdate({username: query.username}, 
      {
        sync: query.sync
      },{upsert:true,new:true})
    .then((doc,err) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200)
        }

      })
}

// GET
function readsync(req, res, next) {
    var query = req.query
    userProfile.findOne({'username':query.username}, function (err, doc) {
        if (err) {
            res.status(400)
        } else {
            res.json(doc)
        }
    })
}

module.exports = {updatesync, readsync}

