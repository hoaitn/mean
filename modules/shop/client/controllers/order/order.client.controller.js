(function() {
    'use strict';

    angular
        .module('shop')
        .controller('ShopOrderController', OrderController);

    OrderController.$inject = ['$scope', 'orders', 'toastr', 'OrderService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'DTColumnBuilder'];

    function OrderController($scope, orders, toastr, OrderService, DTOptionsBuilder, DTColumnDefBuilder, DTColumnBuilder) {
        var vm = this;
        vm.orders = orders;
        // Order controller logic

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withBootstrap()
            .withOption('order', [

            ])
            .withLanguage({
                sLengthMenu: 'View _MENU_ records',
                sInfo: 'Found _TOTAL_ records',
                oPaginate: {
                    sPage: 'Page',
                    sPageOf: 'of'
                }
            })
            .withPaginationType('input')
            .withColumnFilter();


        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0).notSortable(),
            DTColumnDefBuilder.newColumnDef(5).notSortable(),
            DTColumnDefBuilder.newColumnDef(6).notSortable(),
            DTColumnDefBuilder.newColumnDef(8).notSortable()
        ];

        vm.selectedAll = false;

        vm.selectAll = function() {

            if ($scope.selectedAll) {
                $scope.selectedAll = false;
            } else {
                $scope.selectedAll = true;
            }

            angular.forEach(vm.products, function(item) {
                item.selected = $scope.selectedAll;
            });
        };

        vm.reloadData = function() {
            OrderService.getList().then(function(orders) {
                vm.orders = orders;
            });
        };

        vm.done = function() {
            if (!vm.order.isLocked) {
                OrderService.done(vm.order).then(function(res) {
                    toastr.success('Đơn hàng đã được xử lý!', 'Thông báo!');
                }, function(err) {

                });
            } else {
                toastr.info('Đơn hàng đã xử lý rồi!', 'Thông báo!');
            }

        };
    }
})();