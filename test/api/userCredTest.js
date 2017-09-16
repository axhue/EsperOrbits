let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';




//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../api/bin/www');
let should = chai.should();
let expect = chai.expect
let userCred = require('../../api/routes/userCred')
chai.use(chaiHttp);

describe('Orbit', () => {
    before( (done)=> {
        console.log('cleaning up')
        Orbit.orbitPersist.remove({}, (err) => {
            done();
        })
    })



describe('signup', function () {
  it('should return username indicating success', function (done) {
    chai.request(server)
            .post('/api/usercred')
            .send({ pswd: 'random_pswd'
                    username: 'user1',
                    })
            .end((err, res) => {
              res.should.be.status(200);
              done();
            });
  });
});

describe('login', function () {
  it('should return 200 indicating success', function (done) { 
    chai.request(server)
            .get('/api/usercred')
            .query({
                pswd:'random_pswd',
                username:'user1'
            })
            .end((err, res) => {
                if(err){
                    console.log(err.response.error.text)
                }
                res.should.be.status(200);
              done();
            });
  });
});
})// end orbit tests


