'use strict';

var invoice = require('./../controllers/invoice.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/shop/invoice')
		.get(invoice.list)
		.post(invoice.create);

	app.route('/api/shop/invoice/:invoiceId')
		.get(invoice.read)
		.put(invoice.update)
		.delete(invoice.delete);

	app.route('/api/shop/invoice/test')
		.get(invoice.dailyReport);

	app.param('invoiceId', invoice.invoiceByID);
};