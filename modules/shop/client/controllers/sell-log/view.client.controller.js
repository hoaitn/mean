(function() {
    'use strict';

    angular
        .module('shop')
        .controller('ShopSellLogInfoController', ShopSellLogInfoController);

    ShopSellLogInfoController.$inject = ['$scope', 'log'];

    function ShopSellLogInfoController($scope, log) {
        var vm = this;

        // Order controller logic
        vm.log = log;
    }
})();