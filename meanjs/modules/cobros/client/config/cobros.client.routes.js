(function () {
  'use strict';

  angular
    .module('cobros')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cobros', {
        abstract: true,
        url: '/cobros',
        template: '<ui-view/>'
      })
      .state('cobros.list', {
        url: '',
        templateUrl: 'modules/cobros/client/views/list-cobros.client.view.html',
        controller: 'CobrosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cobros List'
        }
      })
      .state('cobros.create', {
        url: '/create',
        templateUrl: 'modules/cobros/client/views/form-cobro.client.view.html',
        controller: 'CobrosController',
        controllerAs: 'vm',
        resolve: {
          cobroResolve: newCobro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Cobros Create'
        }
      })
      .state('cobros.edit', {
        url: '/:cobroId/edit',
        templateUrl: 'modules/cobros/client/views/form-cobro.client.view.html',
        controller: 'CobrosController',
        controllerAs: 'vm',
        resolve: {
          cobroResolve: getCobro
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Cobro {{ cobroResolve.name }}'
        }
      })
      .state('cobros.view', {
        url: '/:cobroId',
        templateUrl: 'modules/cobros/client/views/view-cobro.client.view.html',
        controller: 'CobrosController',
        controllerAs: 'vm',
        resolve: {
          cobroResolve: getCobro
        },
        data: {
          pageTitle: 'Cobro {{ cobroResolve.name }}'
        }
      });
  }

  getCobro.$inject = ['$stateParams', 'CobrosService'];

  function getCobro($stateParams, CobrosService) {
    return CobrosService.get({
      cobroId: $stateParams.cobroId
    }).$promise;
  }

  newCobro.$inject = ['CobrosService'];

  function newCobro(CobrosService) {
    return new CobrosService();
  }
}());
