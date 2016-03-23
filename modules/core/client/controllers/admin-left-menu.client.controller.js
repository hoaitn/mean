'use strict';

angular.module('core').controller('AdminLeftMenuController', ['Authentication',
	function(Authentication) {
		// Admin left menu controller logic
		var self = this;
		self.authentication = Authentication;
	}
]);