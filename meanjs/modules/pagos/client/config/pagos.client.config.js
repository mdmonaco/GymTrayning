(function () {
  'use strict';

  angular
    .module('pagos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Pagos',
      state: 'pagos',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'pagos', {
      title: 'Nuevo pago',
      state: 'pagos.create',
//      roles: ['user']
    });
  
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'pagos', {
      title: 'Historial de pagos',
      state: 'pagos.list'
    });
    
  }
}());
