'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
//var mongoose = require('mongoose');
acl = new acl(new acl.memoryBackend());
//acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));

/**
 * Invoke Admin Permissions
 */
exports.invokeRolesPolicies = function() {
    acl.allow([{
        roles: ['admin'],
        allows: [{
            resources: '/api/shop/color',
            permissions: '*'
        }, {
            resources: '/api/shop/color/:colorId',
            permissions: '*'
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/shop/color',
            permissions: ['get']
        }, {
            resources: '/api/shop/color/:colorId',
            permissions: ['get']
        }]
    }]);
};

/**
 * Check If Admin Policy Allows
 */
exports.isAllowed = function(req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];
    // Check for user roles
    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
        if (err) {
            // An authorization error occurred.
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