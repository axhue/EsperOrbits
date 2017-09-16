var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var OrbitPersistSchema = new Schema({
  username: {type: String, required: true},
  data: {type:Array,required: true},
  time: {type:Date,required:true},
  tag: {type:String, required: true, unique: true},
  from: {type:String}
})
/*
  nodes: {type: Array},
  speed: {type: String},
  radius: {type: Number, required: true},
*/
var orbitPersist = mongoose.model('orbitPersistent',
    OrbitPersistSchema, 'orbitPersistent');

// POST to create an Orbit with a specified tag

function newOrbit(req, res) {
  var query = req.body
  var orbit = []
  var i = 0
  if(!query.data || !query.tag || !query.username || !query.time){
    res.status(400).send({err:'Please provide username and orbit tag'});
  }
  else {
    var doc = {
      data: query.data,
      tag: query.tag,
      username: query.username,
      time: query.time,
      from: query.from || null
    }
    orbitPersist.findOneAndUpdate({username: query.username,
      tag: query.tag}, 
      doc,
      {upsert:true,new:true}).then((doc,err) => {
        if(doc) {
            res.json({
                    err:true,
                    res:null
                })
        } else {
          res.status(400).send(err)
        }
    })

    }
}

// GET to retreive orbit searched by tag
function getOrbit(req, res) {
  var query = req.query
  var usr = query.username
  var tag = query.tag
  if(usr === undefined || tag === undefined){
    res.status(400).send('Please provide username and orbit tag');
  }
  else{
    try {
      orbitPersist.findOne({'tag':tag,'username':usr}, function (err, doc) {
        if (err) {
          throw err
        } else {
          res.json({err:false,res:doc})
        }
      })
    } catch (err) {
      res.status(400).send('ERROR '+ err)
    }
  }
}
// PUT to update orbit searched by tag
function updateOrbit(req, res) {
  var query = req.body
  var orbit = []
  var i = 0
  if(!query.data || !query.tag || !query.username || !query.time){
    res.status(400).send({err:'Please provide username, data, tag, time'});
  }
  else {
    var doc = {
      data: query.data,
      tag: query.new_tag || query.tag,
      username: query.username,
      time: query.time,
      from: query.from || null
    }
    orbitPersist.findOneAndUpdate({username: query.username,
      tag: query.tag}, 
      doc,
      {upsert:true,new:true}).then((doc,err) => {
        if(doc) {
            res.json({
                    err:false,
                    res:null
                })
        } else {
          res.status(400).send(err)
        }
    })

    }
}


// DELETE to delete orbit search by tag
function deleteOrbit(req, res) {
  tag = req.query.tag
  username = req.query.username
  if(tag == undefined || username == undefined) {
    res.status(400).send('invalid params')
  } else {
      orbitPersist.deleteOne({tag: tag, username: username}, function(e) {
        if (e) {
          res.status(400).send(e)
        } else {
          res.status(200).send('success')
        }
      })
    }
}


module.exports = { newOrbit, getOrbit,
                   updateOrbit, deleteOrbit,orbitPersist};
