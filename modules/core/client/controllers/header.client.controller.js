'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus', 'orders',
    function($scope, $state, Authentication, Menus, orders) {
        // Expose view variables
        var vm = this;
        $scope.$state = $state;
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });

        vm.orders = orders;

    }
]);