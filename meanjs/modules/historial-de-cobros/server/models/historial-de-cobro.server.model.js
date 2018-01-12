'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Historial de cobro Schema
 */
var HistorialDeCobroSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Historial de cobro name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('HistorialDeCobro', HistorialDeCobroSchema);
