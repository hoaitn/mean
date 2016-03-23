(function() {
    'use strict';

    angular
        .module('shop')
        .factory('SellLogService', shopService);

    shopService.$inject = ['Restangular'];

    function shopService(Restangular) {
        // Sell log service logic
        var sv = Restangular.all('shop/sell-log');

        // Public API
        return {
            getList: function() {
                return sv.getList();
            }
        };
    }
})();