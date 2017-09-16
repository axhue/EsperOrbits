var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var orbitPersist = require('./orbitPersist')
var userCred = require('./userCred')
var userProfile = require('./userProfile')
/*
var userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  pswd: {type: String, required: true}
});
userSchema.plugin(uniqueValidator)
var User = mongoose.model('users', userSchema, 'users');

*/
var userDataSchema = new Schema({
  username: {type: String, required: true},
  data: {type:Array,required:true},
  time: {type:Date,required:true},
  tag: {type:String, required: true}
});


var userData = mongoose.model('userData', userDataSchema);






// Expreimental

var OrbitPersistSchema = new Schema({
  username: {type: String, required: true},
  nodes: {type: Array},
  speed: {type: String},
  radius: {type: Number, required: true},
  time: {type:Date,required:true},
  tag: {type:String, required: true, unique: true},
  next: {type:String},
  from: {type:String}
})

var NodePersistSchema = new Schema({
  lvl: {type: String, required: true},
  pos: {type: String, required: true},
  name: {type: String, required: true},
  complete: {type: Boolean, required: true},
  metadata: {type: Object, required: true},
  time: {type: Number},
  point_to: {type:String} // tag of the orbit should the node point to an
})

var userPersist = mongoose.model('userPersistent', OrbitPersistSchema, 'userPersistent');
// end experimental

/* GET home page. */
/*
router.post('/login', function(req, res, next) {
  var query = req.body.body
  var login = query.usr
  var pswd = query.pswd
  User.findOne({ username: login , pswd:pswd}, 'username', function (err, user) {
    if (err) {
        res.json({
            err:true,
            res:null
        })
    } else {
        res.json({err:false, res:user})
    }    
  })

});

router.post('/signup', function(req, res, next) {
  var query = req.body.body
  var login = query.usr
  var pswd = query.pswd
  try{
    var user_entry = new User({
      username: login,
      pswd: pswd
    })
    user_entry.save(function (err) {
      if (err) {
          res.json({
              err:true,
              res:null
          })
      } else {
          res.json({err:false,res:true})
      }
    });
  }
  catch (err) {
    res.json({err: true, res: null})
  }

});
*/

router.route('/usercred')
  .get(userCred.login)
  .post(userCred.signup)

router.route('/persistorbit')
  .post(orbitPersist.newOrbit)
  .get(orbitPersist.getOrbit)
  .put(orbitPersist.updateOrbit)
  .delete(orbitPersist.deleteOrbit)

router.route('/user_sync')
  .put(userProfile.updatesync)
  .get(userProfile.readsync)
router.post('/getdata', function(req, res, next) {
  var query = req.body.body
  var usr = query.usr
  var time = query.time
  var tag = query.tag

  var clientTime = new Date(time)
  var nextDay = new Date(time)

  clientTime.setHours(0,0,0,0)
  nextDay.setHours(24,0,0,0,0)
  try {
    userData.findOne({'time': {'$gt':clientTime,'$lt':nextDay},
                      'username':usr,
                      'tag':tag}, 'data tag', function (err, user) {

    if (err) {
        console.log(err)
        res.json({
            err:true,
            res:null
        })
    } else {
      console.log(user)
        res.json({err:false,res:user})
    }    
  })
  }

  catch (err) {
    res.status(400,{err:err})
  }

});

router.get('/getpersistdata', function(req, res, next) {
  var query = req.query
  var usr = query.username
  var tag = query.tag
  try {
    userPersist.findOne({'tag':tag,'username':usr}, function (err, doc) {
    if (err) {
        // console.log(err)
        res.json({
            err:true,
            res:null
        })
    } else {
      res.json({err:false,res:doc})
    }    
  })
  }

  catch (err) {
    res.status(400,{err:err})
  }
});

router.post('/setpersistdata', function (req, res, next) {
  var query = req.body
  var orbit = []
  var i = 0
    var doc = {
      nodes: query.data[i].nodes,
      speed: query.data[i].speed,
      radius: query.data[i].radius,
      tag: query.tag,
      username: query.username,
      time: query.time,
      next: query.data[i+1] || null,
      from: query.data[i-1] || null
    }
    userPersist.findOneAndUpdate({username: query.username,
      tag: query.tag}, 
      doc,
      {upsert:true,new:true},
      function (err, doc) {
        if(err) {
          console.log(err)
          res.status(400)
        } else {
          res.status(200)
        }
    })

})

router.delete('/delpersistdata', function (req, res, next) {
  //to delete an orbit given it's unique tag
  tag = req.params.tag
  console.log(tag)
  userPersist.deleteOne({tag: tag}, function(e) {
    if (e) {
      res.status(400)
    } else {
      res.status(200)
    }
  })
})
router.get('/gettags', function (req, res) {
  var criteria = req.params.criteria
  // validate criteria
  userData.distinct('tag', criteria, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      res.json(doc)
    }
  })
})


router.post('/setdata', function(req, res, next) {
  var query = req.body.body
  var usr = query.usr
  var data = query.data
  var time = query.time // time on client's machine
  //need timezone and local time
  var clientTime = new Date(time)
  var nextDay = new Date(time)
  console.log(query)
  //create a time range of 1 day
  clientTime.setHours(0,0,0,0)
  nextDay.setHours(24,0,0,0,0)
  userData.findOneAndUpdate({'time': {'$gte':clientTime,'$lte':nextDay},'username':usr, 'tag': query.tag},
                            {data:data, time:new Date(time), tag: query.tag},{upsert:true,new:true}).then((doc) => {
    console.log(doc)
    res.json({err:false,res:true})
  })
  /*
  userData.findOne({'time': {'$lte':clientTime,'$gte':nextDay}}).then((res) => {
    if(res==null){
      try{
        var userData_entry = new userData({
          username: query.usr,
          data: query.data,
          time: new Date(query.time)
        })
        userData_entry.save(function (err) {
          if (err) {
              console.log(err)
              res.status(400,{
                  err:true,
                  res:null
              })
          } else {
              res.json({err:false,res:true})
          }
        });
    }
    catch (err) {
      res.status(400,{err:err})
    }
  } else{

  }

  })*/
  /*
  */
});
module.exports = router;
