(function() {
    'use strict';

    angular
        .module('shop')
        .controller('ShopInvoiceInfoController', ShopInvoiceInfoController);

    ShopInvoiceInfoController.$inject = ['$scope', 'invoice'];

    function ShopInvoiceInfoController($scope, invoice) {
        var vm = this;

        // Order controller logic
        vm.invoice = invoice;
    }
})();