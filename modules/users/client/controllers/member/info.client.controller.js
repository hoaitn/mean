(function() {
    'use strict';

    angular
        .module('users')
        .controller('AdminMemberInfoController', AdminMemberInfoController);

    AdminMemberInfoController.$inject = ['$scope', 'member'];

    function AdminMemberInfoController($scope, member) {
        var vm = this;

        // Member controller logic
        vm.member = member;
    }
})();