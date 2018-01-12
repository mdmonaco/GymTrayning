(function () {
  'use strict';

  angular
    .module('historial-de-cobros')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('historial-de-cobros', {
        abstract: true,
        url: '/historial-de-cobros',
        template: '<ui-view/>'
      })
      .state('historial-de-cobros.list', {
        url: '',
        templateUrl: 'modules/historial-de-cobros/client/views/list-historial-de-cobros.client.view.html',
        controller: 'HistorialDeCobrosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Historial de cobros List'
        }
      })
      .state('historial-de-cobros.create', {
        url: '/create',
        templateUrl: 'modules/historial-de-cobros/client/views/form-historial-de-cobro.client.view.html',
        controller: 'HistorialDeCobrosController',
        controllerAs: 'vm',
        resolve: {
          historial-de-cobroResolve: newHistorialDeCobro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Historial de cobros Create'
        }
      })
      .state('historial-de-cobros.edit', {
        url: '/:historialDeCobroId/edit',
        templateUrl: 'modules/historial-de-cobros/client/views/form-historial-de-cobro.client.view.html',
        controller: 'HistorialDeCobrosController',
        controllerAs: 'vm',
        resolve: {
          historial-de-cobroResolve: getHistorialDeCobro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Historial de cobro {{ historial-de-cobroResolve.name }}'
        }
      })
      .state('historial-de-cobros.view', {
        url: '/:historialDeCobroId',
        templateUrl: 'modules/historial-de-cobros/client/views/view-historial-de-cobro.client.view.html',
        controller: 'HistorialDeCobrosController',
        controllerAs: 'vm',
        resolve: {
          historial-de-cobroResolve: getHistorialDeCobro
        },
        data: {
          pageTitle: 'Historial de cobro {{ historial-de-cobroResolve.name }}'
        }
      });
  }

  getHistorialDeCobro.$inject = ['$stateParams', 'HistorialDeCobrosService'];

  function getHistorialDeCobro($stateParams, HistorialDeCobrosService) {
    return HistorialDeCobrosService.get({
      historialDeCobroId: $stateParams.historialDeCobroId
    }).$promise;
  }

  newHistorialDeCobro.$inject = ['HistorialDeCobrosService'];

  function newHistorialDeCobro(HistorialDeCobrosService) {
    return new HistorialDeCobrosService();
  }
}());
