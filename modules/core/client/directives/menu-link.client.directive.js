'use strict';

angular.module('core').directive('menuLink', [
    function() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'modules/core/client/views/partials/menu-link.tmpl.client.view.html',
            link: function(scope, elem) {
                var vm = elem.parent().controller();
                scope.focusSection = function() {
                    console.log(vm);
                    //vm.autoFocusContent = true;
                };
            }
        };
    }
]);