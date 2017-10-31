(function () {
  'use strict';

  angular
    .module('charges')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Cobros',
      state: 'charges'
    });
  }
}());
