'use strict';

angular.module('core').service('ThemeService', [
    function() {
        // Theme service logic
        // ...

        // Public API
        this.theme = 'sliver';

        this.setTheme = function(theme) {
            this.theme = theme;
        };
    }
]);