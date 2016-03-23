(function() {
    'use strict';

    angular.module('shop')
        .factory('ProductCodeService', ['$q', 'Restangular',

            function($q, Restangular) {
                // Product code service service logic
                var code = Restangular.all('shop/code');
                var vm = {};
                // Public API

                vm.getList = function() {
                    var deferred = $q.defer();
                    code.getList().then(function(res) {
                        deferred.resolve(res);
                    }, function(err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                };
                vm.create = function(data) {
                    var deferred = $q.defer();
                    code.post(data).then(function(res) {
                        deferred.resolve(res);
                    }, function(err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                };
                return vm;
            }
        ]);
})();