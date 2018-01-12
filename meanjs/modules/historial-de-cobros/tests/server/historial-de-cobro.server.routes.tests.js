'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  HistorialDeCobro = mongoose.model('HistorialDeCobro'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  historialDeCobro;

/**
 * Historial de cobro routes tests
 */
describe('Historial de cobro CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Historial de cobro
    user.save(function () {
      historialDeCobro = {
        name: 'Historial de cobro name'
      };

      done();
    });
  });

  it('should be able to save a Historial de cobro if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Historial de cobro
        agent.post('/api/historialDeCobros')
          .send(historialDeCobro)
          .expect(200)
          .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
            // Handle Historial de cobro save error
            if (historialDeCobroSaveErr) {
              return done(historialDeCobroSaveErr);
            }

            // Get a list of Historial de cobros
            agent.get('/api/historialDeCobros')
              .end(function (historialDeCobrosGetErr, historialDeCobrosGetRes) {
                // Handle Historial de cobros save error
                if (historialDeCobrosGetErr) {
                  return done(historialDeCobrosGetErr);
                }

                // Get Historial de cobros list
                var historialDeCobros = historialDeCobrosGetRes.body;

                // Set assertions
                (historialDeCobros[0].user._id).should.equal(userId);
                (historialDeCobros[0].name).should.match('Historial de cobro name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Historial de cobro if not logged in', function (done) {
    agent.post('/api/historialDeCobros')
      .send(historialDeCobro)
      .expect(403)
      .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
        // Call the assertion callback
        done(historialDeCobroSaveErr);
      });
  });

  it('should not be able to save an Historial de cobro if no name is provided', function (done) {
    // Invalidate name field
    historialDeCobro.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Historial de cobro
        agent.post('/api/historialDeCobros')
          .send(historialDeCobro)
          .expect(400)
          .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
            // Set message assertion
            (historialDeCobroSaveRes.body.message).should.match('Please fill Historial de cobro name');

            // Handle Historial de cobro save error
            done(historialDeCobroSaveErr);
          });
      });
  });

  it('should be able to update an Historial de cobro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Historial de cobro
        agent.post('/api/historialDeCobros')
          .send(historialDeCobro)
          .expect(200)
          .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
            // Handle Historial de cobro save error
            if (historialDeCobroSaveErr) {
              return done(historialDeCobroSaveErr);
            }

            // Update Historial de cobro name
            historialDeCobro.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Historial de cobro
            agent.put('/api/historialDeCobros/' + historialDeCobroSaveRes.body._id)
              .send(historialDeCobro)
              .expect(200)
              .end(function (historialDeCobroUpdateErr, historialDeCobroUpdateRes) {
                // Handle Historial de cobro update error
                if (historialDeCobroUpdateErr) {
                  return done(historialDeCobroUpdateErr);
                }

                // Set assertions
                (historialDeCobroUpdateRes.body._id).should.equal(historialDeCobroSaveRes.body._id);
                (historialDeCobroUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Historial de cobros if not signed in', function (done) {
    // Create new Historial de cobro model instance
    var historialDeCobroObj = new HistorialDeCobro(historialDeCobro);

    // Save the historialDeCobro
    historialDeCobroObj.save(function () {
      // Request Historial de cobros
      request(app).get('/api/historialDeCobros')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Historial de cobro if not signed in', function (done) {
    // Create new Historial de cobro model instance
    var historialDeCobroObj = new HistorialDeCobro(historialDeCobro);

    // Save the Historial de cobro
    historialDeCobroObj.save(function () {
      request(app).get('/api/historialDeCobros/' + historialDeCobroObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', historialDeCobro.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Historial de cobro with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/historialDeCobros/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Historial de cobro is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Historial de cobro which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Historial de cobro
    request(app).get('/api/historialDeCobros/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Historial de cobro with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Historial de cobro if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Historial de cobro
        agent.post('/api/historialDeCobros')
          .send(historialDeCobro)
          .expect(200)
          .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
            // Handle Historial de cobro save error
            if (historialDeCobroSaveErr) {
              return done(historialDeCobroSaveErr);
            }

            // Delete an existing Historial de cobro
            agent.delete('/api/historialDeCobros/' + historialDeCobroSaveRes.body._id)
              .send(historialDeCobro)
              .expect(200)
              .end(function (historialDeCobroDeleteErr, historialDeCobroDeleteRes) {
                // Handle historialDeCobro error error
                if (historialDeCobroDeleteErr) {
                  return done(historialDeCobroDeleteErr);
                }

                // Set assertions
                (historialDeCobroDeleteRes.body._id).should.equal(historialDeCobroSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Historial de cobro if not signed in', function (done) {
    // Set Historial de cobro user
    historialDeCobro.user = user;

    // Create new Historial de cobro model instance
    var historialDeCobroObj = new HistorialDeCobro(historialDeCobro);

    // Save the Historial de cobro
    historialDeCobroObj.save(function () {
      // Try deleting Historial de cobro
      request(app).delete('/api/historialDeCobros/' + historialDeCobroObj._id)
        .expect(403)
        .end(function (historialDeCobroDeleteErr, historialDeCobroDeleteRes) {
          // Set message assertion
          (historialDeCobroDeleteRes.body.message).should.match('User is not authorized');

          // Handle Historial de cobro error error
          done(historialDeCobroDeleteErr);
        });

    });
  });

  it('should be able to get a single Historial de cobro that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Historial de cobro
          agent.post('/api/historialDeCobros')
            .send(historialDeCobro)
            .expect(200)
            .end(function (historialDeCobroSaveErr, historialDeCobroSaveRes) {
              // Handle Historial de cobro save error
              if (historialDeCobroSaveErr) {
                return done(historialDeCobroSaveErr);
              }

              // Set assertions on new Historial de cobro
              (historialDeCobroSaveRes.body.name).should.equal(historialDeCobro.name);
              should.exist(historialDeCobroSaveRes.body.user);
              should.equal(historialDeCobroSaveRes.body.user._id, orphanId);

              // force the Historial de cobro to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Historial de cobro
                    agent.get('/api/historialDeCobros/' + historialDeCobroSaveRes.body._id)
                      .expect(200)
                      .end(function (historialDeCobroInfoErr, historialDeCobroInfoRes) {
                        // Handle Historial de cobro error
                        if (historialDeCobroInfoErr) {
                          return done(historialDeCobroInfoErr);
                        }

                        // Set assertions
                        (historialDeCobroInfoRes.body._id).should.equal(historialDeCobroSaveRes.body._id);
                        (historialDeCobroInfoRes.body.name).should.equal(historialDeCobro.name);
                        should.equal(historialDeCobroInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      HistorialDeCobro.remove().exec(done);
    });
  });
});
