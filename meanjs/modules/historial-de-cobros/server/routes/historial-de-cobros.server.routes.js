'use strict';

/**
 * Module dependencies
 */
var historialDeCobrosPolicy = require('../policies/historial-de-cobros.server.policy'),
  historialDeCobros = require('../controllers/historial-de-cobros.server.controller');

module.exports = function(app) {
  // Historial de cobros Routes
  app.route('/api/historial-de-cobros').all(historialDeCobrosPolicy.isAllowed)
    .get(historialDeCobros.list)
    .post(historialDeCobros.create);

  app.route('/api/historial-de-cobros/:historialDeCobroId').all(historialDeCobrosPolicy.isAllowed)
    .get(historialDeCobros.read)
    .put(historialDeCobros.update)
    .delete(historialDeCobros.delete);

  // Finish by binding the Historial de cobro middleware
  app.param('historialDeCobroId', historialDeCobros.historialDeCobroByID);
};
