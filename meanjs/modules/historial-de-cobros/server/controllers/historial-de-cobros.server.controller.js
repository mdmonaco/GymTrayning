'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  HistorialDeCobro = mongoose.model('HistorialDeCobro'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Historial de cobro
 */
exports.create = function(req, res) {
  var historialDeCobro = new HistorialDeCobro(req.body);
  historialDeCobro.user = req.user;

  historialDeCobro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(historialDeCobro);
    }
  });
};

/**
 * Show the current Historial de cobro
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var historialDeCobro = req.historialDeCobro ? req.historialDeCobro.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  historialDeCobro.isCurrentUserOwner = req.user && historialDeCobro.user && historialDeCobro.user._id.toString() === req.user._id.toString();

  res.jsonp(historialDeCobro);
};

/**
 * Update a Historial de cobro
 */
exports.update = function(req, res) {
  var historialDeCobro = req.historialDeCobro;

  historialDeCobro = _.extend(historialDeCobro, req.body);

  historialDeCobro.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(historialDeCobro);
    }
  });
};

/**
 * Delete an Historial de cobro
 */
exports.delete = function(req, res) {
  var historialDeCobro = req.historialDeCobro;

  historialDeCobro.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(historialDeCobro);
    }
  });
};

/**
 * List of Historial de cobros
 */
exports.list = function(req, res) {
  HistorialDeCobro.find().sort('-created').populate('user', 'displayName').exec(function(err, historialDeCobros) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(historialDeCobros);
    }
  });
};

/**
 * Historial de cobro middleware
 */
exports.historialDeCobroByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Historial de cobro is invalid'
    });
  }

  HistorialDeCobro.findById(id).populate('user', 'displayName').exec(function (err, historialDeCobro) {
    if (err) {
      return next(err);
    } else if (!historialDeCobro) {
      return res.status(404).send({
        message: 'No Historial de cobro with that identifier has been found'
      });
    }
    req.historialDeCobro = historialDeCobro;
    next();
  });
};
