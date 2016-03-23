'use strict';

angular.module('shop')
    .factory('ProductCategoryService', ['Restangular',
        function(Restangular) {
            // Product category service logic
            var category = Restangular.all('shop/category');

            // Public API
            return {
                getList: function(params) {
                    return category.getList();
                },
                getById: function(id) {
                    return category.one(id).get();
                },
                create: function(data) {
                    return category.post(data);
                },
                update: function(data) {

                    return category.one(data._id).put(data);
                }
            };
        }
    ]);