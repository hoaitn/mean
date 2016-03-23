'use strict';

var statistics = require('./../controllers/statistics.server.controller');
module.exports = function(app) {
	// Routing logic   

	app.route('/api/admin/statistics/invoice')
		.get(statistics.filterInvoice);

	app.route('/api/admin/statistics/sell')
		.get(statistics.filterSell);

	app.route('/api/admin/statistics/product')
		.get(statistics.filterProduct);
};