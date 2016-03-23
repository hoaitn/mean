(function() {
    'use strict';

    angular
        .module('shop')
        .filter('shopCurrency', shopCurrency);

    shopCurrency.$inject = ['$filter', '$locale'];

    function shopCurrency($filter, $locale) {

        return function(amount, symbol) {

            if ($locale.id === 'vi-vn') {
                return $filter('currency')(amount, symbol, 0);
            } else {
                return $filter('currency')(amount, symbol);
            }

        };
    }
})();