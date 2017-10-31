(function (app) {
  'use strict';

  app.registerModule('charges', ['core']);
  app.registerModule('charges.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
