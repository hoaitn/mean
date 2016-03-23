'use strict';

/**
 * @ngdoc directive
 * @name minovateApp.directive:tileControlRefresh
 * @description
 * # tileControlRefresh
 */
angular.module('admin')
    .directive('tileControlRefresh', function() {
        return {
            restrict: 'AE',
            link: function(scope, element) {
                var tile = element.parents('.tile');
                var dropdown = element.parents('.dropdown');

                element.on('click', function() {
                    tile.addClass('refreshing');
                    dropdown.trigger('click');
                });
            }
        };
    });