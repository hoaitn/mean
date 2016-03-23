'use strict';

var cart = require('./../controllers/cart.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/shop/cart')
		.get(cart.list)
		.post(cart.create);

	app.route('/api/shop/cart/active/:cartId')
		.put(cart.active);

	app.route('/api/shop/cart/:cartId')
		.get(cart.read)
		.put(cart.update)
		.delete(cart.delete);

	app.param('cartId', cart.cartByID);
};