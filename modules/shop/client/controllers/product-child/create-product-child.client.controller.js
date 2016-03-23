'use strict';

angular.module('shop')
	.controller('CreateProductChildController', ['$scope', 'toastr', '$state', 'ProductChildService', 'codes', 'product', 'colors', 'FileUploader',

		function($scope, toastr, $state, ProductChildService, codes, product, colors, FileUploader) {
			// Create product controller logic			
			var vm = this;
			var images = [];
			$scope.product = product;
			$scope.product.images = $scope.product.images || [];

			var uploader = $scope.uploader = new FileUploader({
				url: 'api/upload',
				alias: 'image'
			});

			var listUpload = [];

			vm.listCode = codes;
			$scope.listColor = colors;
			$scope.determinate = 100;

			$scope.save = function() {

				$scope.product.images = _.uniq(_.concat(images, $scope.product.images));

				if ($scope.product._id) {
					$scope.product.save().then(function(res) {

						toastr.success('Cập nhật sản phẩm thành công!', 'Thông báo!');
					});
				} else {
					ProductChildService.create($scope.product).then(function(res) {

						toastr.success('Thêm sản phẩm thành công!', 'Thông báo!');

						$state.go('shop.product-child.edit', {
							productId: res._id
						});
					});
				}
			};


			uploader.filters.push({
				name: 'imageFilter',
				fn: function(item, options) {
					var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
					return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
				}
			});

			$scope.removeImage = function(item) {
				_.remove($scope.product.images, function(n) {
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
		}
	]);