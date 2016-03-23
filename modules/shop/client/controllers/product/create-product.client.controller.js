'use strict';

angular.module('shop')
	.controller('CreateProductController', ['$scope', 'toastr', '$state', '$stateParams', 'ProductService', 'product', 'products', 'categories', 'colors', 'FileUploader',

		function($scope, toastr, $state, $stateParams, ProductService, product, products, categories, colors, FileUploader) {
			// Create product controller logic			
			var vm = this;
			var image;
			var images = [];
			vm.product = product;
			vm.products = products;
			vm.genders = [{
				id: 1,
				name: 'Nam'
			}, {
				id: 2,
				name: 'Nữ'
			}, {
				id: 3,
				name: 'Chung'
			}];

			vm.positions = [{
				id: 1,
				name: 'Home 1',
				image: 'modules/shop/client/img/position/1.png'
			}, {
				id: 2,
				name: 'Home 2',
				image: 'modules/shop/client/img/position/2.png'
			}];

			vm.product.images = vm.product.images || [];
			var uploader = $scope.uploader = new FileUploader({
				url: 'api/upload',
				alias: 'image'
			});
			if (vm.product._id) {
				vm.tab = $stateParams.tab || 0;
			} else {
				vm.tab = 0;
			}

			var listUpload = [];

			$scope.categories = categories;
			$scope.colors = colors;
			$scope.determinate = 100;

			vm.save = function() {
				if (images.length) {
					vm.product.images = _.uniq(_.concat(images, vm.product.images));
				}

				if (vm.product._id) {
					vm.product.save().then(function(res) {
						toastr.success('Cập nhật sản phẩm thành công!', 'Thông báo!');
					});
				} else {
					ProductService.create(vm.product).then(function(res) {

						toastr.success('Thêm sản phẩm thành công!', 'Thông báo!');

						$state.go('shop.product.edit', {
							productId: res._id
						});
					});
				}
			};

			vm.savePosition = function() {
				vm.product.save().then(function(res) {
					toastr.success('Cập nhật vị trí thành công!', 'Thông báo!');
				});
			};


			uploader.filters.push({
				name: 'imageFilter',
				fn: function(item, options) {
					var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
					return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
				}
			});

			vm.removeImage = function(item) {
				_.remove(vm.product.images, function(n) {
					return n === item;
				});
			};

			// CALLBACKS

			uploader.onWhenAddingFileFailed = function(item, filter, options) {
				//console.info('onWhenAddingFileFailed', item, filter, options);
			};
			uploader.onAfterAddingFile = function(fileItem) {
				//console.info('onAfterAddingFile', fileItem);
			};
			uploader.onAfterAddingAll = function(addedFileItems) {
				//console.info('onAfterAddingAll', addedFileItems);
			};
			uploader.onBeforeUploadItem = function(item) {
				//console.info('onBeforeUploadItem', item);
			};
			uploader.onProgressItem = function(fileItem, progress) {
				//console.info('onProgressItem', fileItem, progress);
			};
			uploader.onProgressAll = function(progress) {
				//console.info('onProgressAll', progress);
			};
			uploader.onSuccessItem = function(fileItem, response, status, headers) {
				//console.info('onSuccessItem', fileItem, response, status, headers);
			};
			uploader.onErrorItem = function(fileItem, response, status, headers) {
				//console.info('onErrorItem', fileItem, response, status, headers);
			};
			uploader.onCancelItem = function(fileItem, response, status, headers) {
				//console.info('onCancelItem', fileItem, response, status, headers);
			};
			uploader.onCompleteItem = function(fileItem, response, status, headers) {
				images.push(response.image);

			};
			uploader.onCompleteAll = function() {};

			vm.addChild = function() {
				ProductService.addChild(vm.product, vm.child).then(function(res) {
					toastr.success('Tạo sản phẩm con thành công', 'Thông báo');
					vm.products.push(res);
					vm.child = {};
				}, function(err) {
					toastr.error(err.data.message, 'Thông báo!');
				});
			};
		}
	]);