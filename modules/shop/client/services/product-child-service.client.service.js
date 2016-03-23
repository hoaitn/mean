'use strict';

angular.module('shop').factory('ProductChildService', ['$q', 'Restangular',
    function($q, Restangular) {
        // Product service service logic
        // ...
        var product = Restangular.all('shop/product-child');
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
            getByParent: function(id) {
                return product.one('parent', id).get();
            },
            getList: function() {
                return product.getList();
            },
            showAll: function() {
                return product.one('show-all').getList();
            },
            create: function(data) {
                return product.post(data);
            },
            update: function(data) {
                var elem = product.one(data._id);

                elem = angular.extend(data, elem);
                console.log(elem);
                return elem.put();
            }
        };
    }
]);