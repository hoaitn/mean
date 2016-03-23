'use strict';

angular.module('shop').factory('ColorService', ['Restangular',
    function(Restangular) {
        // Color service logic
        var color = Restangular.all('shop/color');

        // Public API
        return {
            getPagination: function(params) {
                return color.customGET(null, params);
            },
            getById: function(id) {
                return color.one(id).get();
            },
            getList: function() {
                return color.getList();
            },
            create: function(data) {
                return color.post(data);
            },
            done: function(data) {
                return color.one('active', data._id).put();
            }
        };
    }
]);