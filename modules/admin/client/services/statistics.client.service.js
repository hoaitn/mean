(function() {
    'use strict';

    angular
        .module('admin')
        .factory('AdminStatisticsService', adminService);

    adminService.$inject = ['Restangular'];

    function adminService(Restangular) {
        // Statistics service logic
        var sv = Restangular.all('admin/statistics');

        // Public API
        return {
            filterInvoice: function() {
                return sv.all('invoice').getList();
            },
            filterSell: function() {
                return sv.all('sell').getList();
            },
            filterProduct: function() {
                return sv.all('product').getList();
            }
        };
    }
})();