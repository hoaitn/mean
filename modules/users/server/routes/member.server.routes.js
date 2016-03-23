'use strict';

var member = require('./../controllers/member.server.controller');
module.exports = function(app) {
	// Routing logic   
	app.route('/api/user/member')
		.get(member.list);

	app.route('/api/user/member/:memberId')
		.get(member.read);
};