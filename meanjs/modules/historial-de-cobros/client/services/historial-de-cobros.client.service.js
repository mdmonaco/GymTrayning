// Historial de cobros service used to communicate Historial de cobros REST endpoints
(function () {
  'use strict';

  angular
    .module('historial-de-cobros')
    .factory('HistorialDeCobrosService', HistorialDeCobrosService);

  HistorialDeCobrosService.$inject = ['$resource'];

  function HistorialDeCobrosService($resource) {
    return $resource('api/historial-de-cobros/:historialDeCobroId', {
      historialDeCobroId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
