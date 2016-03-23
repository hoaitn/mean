'use strict';

angular.module('shop').factory('ProductService', ['$q', 'Restangular',
    function($q, Restangular) {
        // Product service service logic
        // ...
        var product = Restangular.all('shop/product');
        // Public API
        return {
            getPagination: function(params) {
                return product.customGET(null, params);
            },

            getById: function(id) {
                return product.one(id).get();
            },
            getByCode: function(code) {
                return product.one('code', code).get();
            },
            filterByCode: function(code) {
                return product.one('filter', code).get();
            },
            getList: function() {
                return product.getList();
            },
            getChild: function(data) {
                return data.all('child').getList();
            },
            getAllCode: function() {
                return product.one('all-code').getList();
            },
            create: function(data) {
                return product.post(data);
            },
            update: function(data) {
                var elem = product.one(data._id);

                elem = angular.extend(data, elem);
                console.log(elem);
                return elem.put();
            },
            addChild: function(prod, child) {
                return prod.all('child').post(child);
            }
        };
    }
]);