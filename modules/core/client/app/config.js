'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
    // Init module configuration options
    var applicationModuleName = 'BinShop';
    var applicationModuleVendorDependencies = [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngMessages',
        'picardy.fontawesome',
        'ui.bootstrap',
        'ui.router',
        'ui.utils',
        'ui.select',
        'angular-loading-bar',
        'angular-momentjs',
        'FBAngular',
        'toastr',
        'angularBootstrapNavTree',
        'oc.lazyLoad',
        'ui.tree',
        'textAngular',
        'colorpicker.module',
        'angularFileUpload',
        'ngImgCrop',
        'datatables',
        'datatables.bootstrap',
        'datatables.colreorder',
        'datatables.colvis',
        'datatables.tabletools',
        'datatables.scroller',
        'datatables.columnfilter',
        'ui.grid',
        'ui.grid.resizeColumns',
        'ui.grid.edit',
        'ui.grid.moveColumns',
        'ngTable',
        'smart-table',
        'angular-flot',
        'uiSwitch',
        'ngTagsInput',
        'pascalprecht.translate',
        'localytics.directives',
        'dragularModule',
        'restangular',
        'ngFileUpload',
        'ncy-angular-breadcrumb',
        'chart.js'
    ];

    // Add a new vertical module
    var registerModule = function(moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();