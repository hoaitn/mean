(function() {
    'use strict';

    angular
        .module('shop')
        .factory('OrderService', shopService);

    shopService.$inject = ['Restangular'];

    function shopService(Restangular) {
        // Order service logic
        // ...  
        var order = Restangular.all('shop/order');
        // Public API
        return {
            getList: function() {
                return order.getList();
            },
            getById: function(id) {
                return order.one(id).get();
            },
            getListInvoice: function(data) {
                return data.all('list-invoice').getList();
            },
            done: function(data) {
                return data.one('active').put();
            },
            getListNotActive: function() {
                return order.all('not-active').getList();
            }

        };
    }
})();