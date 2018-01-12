'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Historial de cobros Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/historial-de-cobros',
      permissions: '*'
    }, {
      resources: '/api/historial-de-cobros/:historialDeCobroId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/historial-de-cobros',
      permissions: ['get', 'post']
    }, {
      resources: '/api/historial-de-cobros/:historialDeCobroId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/historial-de-cobros',
      permissions: ['get']
    }, {
      resources: '/api/historial-de-cobros/:historialDeCobroId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Historial de cobros Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Historial de cobro is being processed and the current user created it then allow any manipulation
  if (req.historialDeCobro && req.user && req.historialDeCobro.user && req.historialDeCobro.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
