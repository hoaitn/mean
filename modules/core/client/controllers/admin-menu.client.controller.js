'use strict';

angular.module('core').controller('AdminMenuController', ['$scope', '$state', 'Authentication', 'Menus',
    function($scope, $state, Authentication, Menus) {

        var vm = this;
        vm.authentication = Authentication;
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = Menus.getMenu('sidebar');

        vm.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        function isOpen(section) {
            return vm.menu.isSectionSelected(section);
        }

        function toggleOpen(section) {
            vm.menu.toggleSelectSection(section);
        }
    }
]);