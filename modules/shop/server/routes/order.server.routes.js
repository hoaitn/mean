'use strict';

var order = require('./../controllers/order.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/shop/order')
		.get(order.list)
		.post(order.create);

	app.route('/api/shop/order/not-active')
		.get(order.listNotActive);

	app.route('/api/shop/order/:orderId')
		.get(order.read);

	app.route('/api/shop/order/:orderId/active')
		.put(order.active);

	app.route('/api/shop/order/:orderId/list-invoice')
		.get(order.listInvoice);

	app.param('orderId', order.orderById);
};