'use strict';

var category = require('./../controllers/product-category.server.controller');
module.exports = function(app) {
	var policy = require('../policies/category.server.policy');
	// Routing logic   
	app.route('/api/shop/category')
		.get(category.list)
		.post(policy.isAllowed, category.create);
	app.route('/api/shop/category/:categoryId')
		.put(policy.isAllowed, category.update)
		.get(category.read);
};