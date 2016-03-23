'use strict';

var log = require('./../controllers/sell-log.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/shop/sell-log')
		.get(log.list);
};