(function () {
  'use strict';

  angular
    .module('charges.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('charges', {
        url: '/charges',
        templateUrl: '/modules/charges/client/views/charges.client.view.html',
        controller: 'ChargesController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
}());
