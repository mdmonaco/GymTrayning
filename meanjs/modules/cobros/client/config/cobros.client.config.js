(function () {
  'use strict';

  angular
    .module('cobros')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Cobros',
      state: 'cobros',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'cobros', {
      title: 'List Cobros',
      state: 'cobros.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'cobros', {
      title: 'Create Cobro',
      state: 'cobros.create',
      roles: ['user']
    });
  }
}());
