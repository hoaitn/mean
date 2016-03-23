'use strict';

angular.module('shop').factory('CartService', ['Restangular',
    function(Restangular) {
        // Cart service service logic
        var invoice = Restangular.all('shop/cart');

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
            },
            done: function(data) {
                return invoice.one('active', data._id).put();
            },
            remove: function(data) {
                return invoice.one(data._id).remove();
            }
        };
    }
]);