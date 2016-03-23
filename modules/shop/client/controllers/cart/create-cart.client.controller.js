'use strict';

angular.module('shop')
	.controller('CreateCartController', ['$scope', '$log', '$q', '$state', 'CartService', 'cart', 'listShipper', 'ProductService', 'toastr',
		function($scope, $log, $q, $state, CartService, invoice, listShipper, ProductService, toastr) {
			// Shop invoice controller logic
			var vm = this;
			invoice.products = invoice.products || [];
			vm.invoice = invoice;
			vm.listShipper = listShipper;

			vm.save = function(event) {
				var parentEl = angular.element(document.body);
				if (vm.invoice._id) {
					vm.invoice.save().then(function(res) {
						vm.invoice = res;

						toastr.success('Cập nhật hóa đơn thành công!', 'Thông báo!');
					});
				} else {
					CartService.create(vm.invoice).then(function(res) {
						toastr.success('Thêm hóa đơn thành công!', 'Thông báo!');
						$state.go('shop.cart.edit', {
							cartId: res._id
						});

					});
				}

			};

			vm.removeProductInvoice = function(item) {
				_.remove(vm.invoice.products, function(n) {
					return n.product._id === item.product._id;
				});
			};

			vm.getTotal = function() {
				var total = 0;
				if (vm.invoice.sellType === 1) {
					total += vm.invoice.shipMoney || 0;
				}

				_.forEach(vm.invoice.products, function(value, key) {
					total += value.product.priceSell * value.total;
				});
				if (vm.invoice.hasDiscount) {
					total -= vm.invoice.discount || 0;
				}
				return total;
			};

			/*$scope.$watch(function() {
				return vm.getTotal();
			}, function(newValue, oldValue, scope) {

				vm.invoice.totalPrice = newValue;

			});*/

			vm.autocomp = {
				isDisabled: false
			};

			vm.querySearch = querySearch;
			vm.selectedItemChange = selectedItemChange;
			vm.searchTextChange = searchTextChange;

			function querySearch() {
				if (_.trim(vm.searchText)) {
					var deferred = $q.defer();
					ProductService.getPagination({
						page: 1,
						filter: _.trim(vm.searchText)
					}).then(function(res) {
						deferred.resolve(res.docs);
					}, function(err) {
						deferred.reject(err);
					});
					return deferred.promise;
				}

			}

			function searchTextChange(text) {

			}

			function selectedItemChange(item) {
				if (item) {
					var c;
					if (!_.some(_.map(vm.invoice.products, 'product'), {
							_id: item._id
						})) {
						c = {
							product: item,
							total: 1
						};
						vm.invoice.products.push(c);
					}
				}

				vm.searchText = null;

			}

			/**
			 * [searchProduct description]
			 * @return {[type]} [description]
			 */
			vm.searchProduct = function() {
				ProductService.filterByCode(vm.product_code).then(function(succ) {
					vm.listFilter = succ;
				});
			};

			vm.addToCart = function(item) {
				if (!_.some(vm.invoice.products, function(n) {
						return n.product._id === item._id;
					})) {
					vm.invoice.products.push({
						product: item,
						total: 1
					});
				}
			};

			vm.removeItem = function(item) {
				_.remove(vm.invoice.products, function(n) {
					return n.product._id === item.product._id;
				});
			};
		}
	]);