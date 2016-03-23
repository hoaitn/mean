(function () {
  'use strict';

  angular
    .module('shop')
    .factory('shopService', shopService);

  shopService.$inject = [/*Example: '$state', '$window' */];

  function shopService(/*Example: $state, $window */) {
    // Statistics service logic
    // ...

    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }
})();
