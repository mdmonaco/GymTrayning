'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  HistorialDeCobro = mongoose.model('HistorialDeCobro');

/**
 * Globals
 */
var user,
  historialDeCobro;

/**
 * Unit tests
 */
describe('Historial de cobro Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      historialDeCobro = new HistorialDeCobro({
        name: 'Historial de cobro Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return historialDeCobro.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      historialDeCobro.name = '';

      return historialDeCobro.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    HistorialDeCobro.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
