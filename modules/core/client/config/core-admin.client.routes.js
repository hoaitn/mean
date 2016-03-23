(function() {
    'use strict';

    // Setting up route
    angular.module('core.admin.routes').config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    data: {
                        roles: ['manager', 'admin']
                    },
                    ncyBreadcrumb: {
                        label: 'Dashboard'
                    },
                    views: {
                        'header@admin': {
                            templateUrl: 'modules/core/client/views/admin/header.client.view.html',
                            controller: 'HeaderController',
                            controllerAs: 'vm',
                            resolve: {
                                orders: listOrder
                            }
                        },
                        'rightbar@admin': {
                            templateUrl: 'modules/core/client/views/admin/rightbar.client.view.html'
                        },
                        'nav@admin': {
                            controller: 'AdminNavController',
                            controllerAs: 'vm',
                            templateUrl: 'modules/core/client/views/admin/nav.client.view.html'
                        },

                        '': {
                            templateUrl: 'modules/core/client/views/admin/layout.client.view.html'
                        }
                    }
                });
        }
    ]);

    listOrder.$inject = ['OrderService'];

    function listOrder(OrderService) {
        return OrderService.getListNotActive();
    }
})();