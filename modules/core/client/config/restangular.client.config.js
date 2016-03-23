'use strict';

// Core module config
angular.module('core').config(['RestangularProvider',
	function(RestangularProvider) {
		// Config logic
		RestangularProvider.setBaseUrl('/api');
	}
]);