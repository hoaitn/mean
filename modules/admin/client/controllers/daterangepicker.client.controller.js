(function() {
    'use strict';

    angular
        .module('admin')
        .controller('DaterangepickerController', DaterangepickerController);

    DaterangepickerController.$inject = ['$scope', '$window'];

    function DaterangepickerController($scope, $window) {
        var vm = this;

        // Daterangepicker controller logic
        // ...

        vm.startDate = $window.moment().subtract(1, 'days').format('MM/DD/YYYY');
        vm.endDate = $window.moment().add(31, 'days').format('MM/DD/YYYY');
        vm.rangeOptions = {
            locale: {
                format: 'MM/DD/YYYY',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'Từ',
                toLabel: 'Đến',
                customRangeLabel: 'Tùy chỉnh',
                daysOfWeek: [
                    'CN',
                    'T2',
                    'T3',
                    'T4',
                    'T5',
                    'T6',
                    'T7'
                ],
                monthNames: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12'
                ],
                firstDay: 1
            },
            ranges: {
                'Hôm nay': [$window.moment(), $window.moment()],
                'Hôm qua': [$window.moment().subtract(1, 'days'), $window.moment().subtract(1, 'days')],
                '7 ngày cuối cùng': [$window.moment().subtract(6, 'days'), $window.moment()],
                '30 ngày cuối cùng': [$window.moment().subtract(29, 'days'), $window.moment()],
                'Tháng này': [$window.moment().startOf('month'), $window.moment().endOf('month')],
                'Tháng cuối cùng': [$window.moment().subtract(1, 'month').startOf('month'), $window.moment().subtract(1, 'month').endOf('month')]
            },
            opens: 'left',
            startDate: $window.moment().subtract(29, 'days'),
            endDate: $window.moment(),
            parentEl: '#content'
        };
    }
})();