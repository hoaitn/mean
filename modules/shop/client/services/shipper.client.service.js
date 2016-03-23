'use strict';

angular.module('shop').factory('ShipperService', ['Restangular',
    function(Restangular) {
        // Shipper service logic
        // ...

        // Public API
        var api = Restangular.all('shop/shipper');

        // Public API
        return {
            getList: function(params) {
                return api.getList();
            },
            getById: function(id) {
                return api.one(id).get();
            },
            create: function(data) {
                return api.post(data);
            },
            update: function(data) {

                return api.one(data._id).put(data);
            }
        };
    }
]);