(function () {
  'use strict';

  angular
    .module('historial-de-cobros')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Historial de cobros',
      state: 'historial-de-cobros',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'historial-de-cobros', {
      title: 'List Historial de cobros',
      state: 'historial-de-cobros.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'historial-de-cobros', {
      title: 'Create Historial de cobro',
      state: 'historial-de-cobros.create',
      roles: ['user']
    });
  }
}());
