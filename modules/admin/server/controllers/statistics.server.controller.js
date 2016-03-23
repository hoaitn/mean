'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./statistics/invoice.server.controller'),
	require('./statistics/product.server.controller')
);