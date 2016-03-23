'use strict';

angular.module('core').directive('menuToggle', ['$timeout',
    function($timeout) {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'modules/core/client/views/partials/menu-toggle.tmpl.client.view.html',
            link: function(scope, element) {
                var controller = element.parent().controller();
                scope.isOpen = function() {
                    return controller.isOpen(scope.section);
                };
                scope.toggle = function() {
                    controller.toggleOpen(scope.section);
                };
            }
        };

    }
]);