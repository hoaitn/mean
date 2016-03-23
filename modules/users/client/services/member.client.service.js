(function() {
    'use strict';

    angular
        .module('users')
        .factory('MemberService', usersService);

    usersService.$inject = ['Restangular'];

    function usersService(Restangular) {
        // Member service logic
        var sv = Restangular.all('user/member');

        // Public API
        return {
            getList: function() {
                return sv.getList();
            },
            getById: function(id) {
                return sv.one(id).get();
            }
        };
    }
})();