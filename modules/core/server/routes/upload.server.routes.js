'use strict';
var upload = require('./../controllers/upload.server.controller');

module.exports = function(app) {
	// Routing logic   
	app.route('/api/upload').post(upload.upload);

};