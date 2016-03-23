'use strict';

var color = require('./../controllers/color.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/shop/color')
		.get(color.list)
		.post(color.create);

	app.route('/api/shop/color/:colorId')
		.get(color.read)
		.put(color.update)
		.delete(color.delete);
};