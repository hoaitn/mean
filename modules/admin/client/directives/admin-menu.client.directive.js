'use strict';

angular.module('admin').directive('adminMenu', [
    function() {
        return {
            template: '<md-content><tri-menu-item ng-repeat="item in triMenuController.menu | orderBy:\'priority\'" item="::item"></tri-menu-item></md-content>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

            }
        };
    }
]);