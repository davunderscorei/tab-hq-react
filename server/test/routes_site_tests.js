'use strict';

// var _ = require('lodash');
// var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var async = require('async');
var ObjectId = mongoose.Types.ObjectId;
var passport = require('passport-stub');

mockgoose(mongoose);

var app = require('../app');
var Site = mongoose.model('Site');

passport.install(app);

describe('Routing', function() {
  beforeEach(function() {
    mockgoose.reset();
    Site.create({ name: 'test-1' });
  });

  afterEach(function() {
    passport.logout();
  })

  context('logged in', function() {
    passport.login({ username: 'foo.bar' });

    it('visits an existing site', function(done) {
      request(app)
        .get('/')
        .set('Host', 'test-1.example.com')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('doesn\'t find a non-existant site', function(done) {
      request(app)
        .get('/')
        .set('Host', 'invalid.example.com')
        .expect(404, done);
    });
  });
});

function subdomain(name) {
  var url = 'localhost:3001';
  return 'http://' + name + '.' + url + '/';
}
