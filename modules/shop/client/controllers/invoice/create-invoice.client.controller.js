'use strict';

angular.module('shop')
	.controller('CreateInvoiceController', ['$scope', '$log', '$q', 'InvoiceService', 'invoice', '$state', 'ProductService',
		function($scope, $log, $q, InvoiceService, invoice, $state, ProductService) {
			// Shop invoice controller logic
			var vm = this;
			invoice.products = invoice.products || [];
			vm.invoice = invoice;

			vm.create = function(event) {
				var parentEl = angular.element(document.body);
				if (vm.invoice._id) {
					vm.invoice.save().then(function(res) {
						vm.invoice = res;

					});
				} else {
					InvoiceService.create(vm.invoice).then(function(res) {

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
					total += vm.invoice.shipMoney ? vm.invoice.shipMoney : 0;
				}

				_.forEach(vm.invoice.products, function(value, key) {
					total += value.product.price * value.total;
				});
				if (vm.invoice.hasDiscount) {
					total -= vm.invoice.discount;
				}
				return total;
			};

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
		}
	]);