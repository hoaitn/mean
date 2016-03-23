'use strict';

var product = require('./../controllers/product-child.server.controller'),
	productPolicy = require('../policies/product-child.server.policy');
module.exports = function(app) {
	app.route('/api/shop/product-child').all(productPolicy.isAllowed)
		.get(product.list)
		.post(product.create);

	app.route('/api/shop/product-child/show-all')
		.get(productPolicy.isAllowed, product.getAllProduct);

	app.route('/api/shop/product-child/:productId')
		.put(productPolicy.isAllowed, product.update)
		.get(product.read);

	app.route('/api/shop/product-child/code/:code')
		.get(productPolicy.isAllowed, product.getByCode);

};