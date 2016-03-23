'use strict';

/**
 * @ngdoc directive
 * @name minovateApp.directive:todoFocus
 * @description
 * # todoFocus
 */
angular.module('admin')
    .directive('todoFocus', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                scope.$watch(attrs.todoFocus, function(newVal) {
                    if (newVal) {
                        $timeout(function() {
                            element[0].focus();
                        }, 0, false);
                    }
                });
            }
        };
    }]);