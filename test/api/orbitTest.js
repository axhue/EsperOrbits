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
let Orbit = require('../../api/routes/orbitPersist')
chai.use(chaiHttp);

example_Orbit = {
  nodes: [],
  speed: '',
  radius: 5,
  from: null
}

describe('Orbit', () => {
    before( (done)=> {
        console.log('cleaning up')
        Orbit.orbitPersist.remove({}, (err) => {
            done();
        })
    })



describe('create', function () {
  it('should return 200', function (done) {
    chai.request(server)
            .post('/api/persistorbit')
            .send({data:[example_Orbit],
                    tag:'unique tag',
                    username: 'user1',
                    time: new Date()
                    })
            .end((err, res) => {
                res.should.be.status(200);
              done();
            });
  });
});

describe('get orbit', function () {
  it('should give the example orbit', function (done) { 
    chai.request(server)
            .get('/api/persistorbit')
            .query({
                tag:'unique tag',
                username:'user1'
            })
            .end((err, res) => {
                if(err){
                    console.log(err.response.error.text)
                }
                res.should.be.status(200);    
                res.body.res.data.should.deep.equal([example_Orbit])
                res.body.res.tag.should.equal('unique tag')
                expect(res).to.be.json
              done();
            });
  });
});


describe('update orbit', function () {
  it('should update db and return 200 status', function (done) {
    mod_orbit = [example_Orbit]
    mod_orbit.push(example_Orbit)
    new_tag = 'updated tag'
    chai.request(server)
            .put('/api/persistorbit')
            .send({
                tag:'unique tag',
                new_tag: new_tag,
                data: mod_orbit,
                username:'user1',
                time: new Date()
            })
            .end((err, res) => {
                if(err) {
                    console.log(err.response.error.text)
                }
                res.should.be.status(200);
            });
    chai.request(server)
        .get('/api/persistorbit')
        .query({
            tag:new_tag,
            username:'user1'
        })
        .end((err, res) => {
            if(err){
                console.log(err.response.error.text)
            }
            res.should.be.status(200);    
            res.body.res.data.should.deep.equal(mod_orbit)
            res.body.res.tag.should.equal(new_tag)
            expect(res).to.be.json
          done();
        });
  });
});


describe('delete orbit', function () {
  it('should return 200', function (done) {
    chai.request(server)
            .delete('/api/persistorbit')
            .send({
                tag:'uniqute tag',
                user:'user1'
            })
            .end((err, res) => {
                if(err) {
                    console.log(err.response.error.text)
                }
                res.should.be.status(200);
              done();
            });
  });
});

})// end orbit tests


