(function () {
  'use strict';

  // Historial de cobros controller
  angular
    .module('historial-de-cobros')
    .controller('HistorialDeCobrosController', HistorialDeCobrosController);

  HistorialDeCobrosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'historialDeCobroResolve'];

  function HistorialDeCobrosController ($scope, $state, $window, Authentication, historialDeCobro) {
    var vm = this;

    vm.authentication = Authentication;
    vm.historialDeCobro = historialDeCobro;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Historial de cobro
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.historialDeCobro.$remove($state.go('historial-de-cobros.list'));
      }
    }

    // Save Historial de cobro
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.historialDeCobroForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.historialDeCobro._id) {
        vm.historialDeCobro.$update(successCallback, errorCallback);
      } else {
        vm.historialDeCobro.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('historial-de-cobros.view', {
          historialDeCobroId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
