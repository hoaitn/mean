(function() {
    'use strict';

    angular
        .module('admin')
        .controller('AdminStatisticsController', AdminStatisticsController);

    AdminStatisticsController.$inject = ['$scope'];

    function AdminStatisticsController($scope) {
        var vm = this;

        // Admin statistics controller logic
        // ...

        init();

        function init() {}
    }
})();