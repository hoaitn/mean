'use strict';

module.exports = function(app) {
	var shipper = require('./../controllers/shipper.server.controller');
	// Routing logic   
	app.route('/api/shop/shipper')
		.get(shipper.list)
		.post(shipper.create);

	app.route('/api/shop/shipper/:shipperId')
		.get(shipper.read)
		.put(shipper.update)
		.delete(shipper.delete);
};