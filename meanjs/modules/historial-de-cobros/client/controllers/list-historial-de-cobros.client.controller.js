(function () {
  'use strict';

  angular
    .module('historial-de-cobros')
    .controller('HistorialDeCobrosListController', HistorialDeCobrosListController);

  HistorialDeCobrosListController.$inject = ['HistorialDeCobrosService'];

  function HistorialDeCobrosListController(HistorialDeCobrosService) {
    var vm = this;

    vm.historialDeCobros = HistorialDeCobrosService.query();
  }
}());
