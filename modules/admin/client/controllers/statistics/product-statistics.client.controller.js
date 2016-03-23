(function() {
    'use strict';

    angular
        .module('admin')
        .controller('ProductStatisticsController', InvoiceStatisticsController);

    InvoiceStatisticsController.$inject = ['$scope', '$window', 'AdminStatisticsService'];

    function InvoiceStatisticsController($scope, $window, AdminStatisticsService) {
        var vm = this;

        // Invoice statistics controller logic        
        loadData();

        function loadData() {
            AdminStatisticsService.filterProduct().then(function(res) {
                vm.product = res[0];
            }, function(err) {

            });
        }

    }
})();