'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Product = mongoose.model('Product'),
	ProductChild = mongoose.model('ProductChild'),
	async = require('async'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.create = function(req, res) {
	var product = new Product(req.body);
	product.user = req.user;
	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}
	});
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	Product.findById(req.params.productId)
		.populate('category')
		.populate('colorType')
		.exec(function(err, product) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(product);
		});
};

/**
 * Update a 
 */
exports.update = function(req, res) {

	Product.findByIdAndUpdate(req.params.productId, {
		$set: req.body
	}, function(err, product) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(product);
		}

	});
};

/**
 * Delete an 
 */
exports.delete = function(req, res) {

};

/**
 * List of 
 */
exports.list = function(req, res) {
	/*Product.paginate({
		code: new RegExp(req.query.filter, 'i')
	}, {
		sort: req.query.order,
		populate: [{
			path: 'user',
			select: 'displayName email -_id'
		}, {
			path: 'category',
			select: 'name -_id'
		}],
		lean: true,
		page: req.query.page || 1,
		limit: req.query.limit || 10
	}).then(function(products) {

		res.json(products);

	});*/

	Product.find()
		.populate('user', 'displayName email -_id')
		.populate('category', 'name -_id')
		.exec(function(err, products) {

			res.json(products);

		});
};

/**
 * [productByID description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @param  {[type]}   id   [description]
 * @return {[type]}        [description]
 */
exports.productByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'ID không chính xác'
		});
	}

	Product.findById(id).exec(function(err, product) {
		if (err) {
			return next(err);
		} else if (!product) {
			return next(new Error('Không tìm thấy sản phẩm với mã ' + id));
		} else {
			req.product = product;
			next();
		}
	});
};
/**
 * [getByCode description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getByCode = function(req, res) {
	Product.find({
		code: req.params.code
	}, function(err, products) {
		if (err) {

		}
		res.json(products);

	});
};

/**
 * [allCode description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.allCode = function(req, res) {
	Product.find().select({
		_id: 1,
		code: 1
	}).exec(function(err, products) {
		if (err) {
			return res.status(400).send(err);
		}
		res.json(products);

	});
};

/**
 * [getChildByCode description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getChildByCode = function(req, res) {
	Product.findOne({
		code: new RegExp(req.params.code, 'i')
	}).exec(function(err, product) {
		if (err) {

		} else {
			ProductChild.find({
					product: mongoose.Types.ObjectId(product.id)
				})
				.populate('product')
				.exec(function(err, products) {
					product.products = products;
					res.json(product);
				});
		}

	});
};

exports.getChild = function(req, res) {

	ProductChild.find({
			product: req.product
		})
		.exec(function(err, products) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(products);
			}

		});
};

exports.addChild = function(req, res) {
	var product = new ProductChild(req.body);
	product.user = req.user;
	product.available = product.total;
	product.product = req.product;
	product.save(function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(item);
		}
	});
};