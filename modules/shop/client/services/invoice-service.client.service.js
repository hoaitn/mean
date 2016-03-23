'use strict';

angular.module('shop').factory('InvoiceService', ['Restangular',
    function(Restangular) {
        // Invoice service service logic
        var invoice = Restangular.all('shop/invoice');

        // Public API
        return {
            getPagination: function(params) {
                return invoice.customGET(null, params);
            },
            getById: function(id) {
                return invoice.one(id).get();
            },
            getList: function() {
                return invoice.getList();
            },
            create: function(data) {
                return invoice.post(data);
            }
        };
    }
]);