(function() {
    'use strict';

    angular
        .module('users')
        .controller('AdminMemberController', AdminMemberController);

    AdminMemberController.$inject = ['$scope', 'members'];

    function AdminMemberController($scope, members) {
        var vm = this;

        // Member controller logic
        vm.members = members;
    }
})();