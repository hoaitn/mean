'use strict';

var product = require('./../controllers/product.server.controller'),
	productPolicy = require('../policies/product.server.policy');
module.exports = function(app) {
	app.route('/api/shop/product').all(productPolicy.isAllowed)
		.get(product.list)
		.post(product.create);

	app.route('/api/shop/product/all-code')
		.get(product.allCode);

	app.route('/api/shop/product/:productId').all(productPolicy.isAllowed)
		.put(product.update)
		.get(product.read);

	app.route('/api/shop/product/:productId/child')
		.get(product.getChild)
		.post(product.addChild);

	app.route('/api/shop/product/code/:code')
		.get(product.getByCode);

	app.route('/api/shop/product/filter/:code')
		.get(product.getChildByCode);

	app.param('productId', product.productByID);
};