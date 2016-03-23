'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	ProductChild = mongoose.model('ProductChild'),
	Product = mongoose.model('Product'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.create = function(req, res) {
	var product = new ProductChild(req.body);
	product.user = req.user;
	product.available = product.total;
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
	ProductChild.findById(req.params.productId, function(err, product) {
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
 * Update a 
 */
exports.update = function(req, res) {

	ProductChild.findByIdAndUpdate(req.params.productId, {
		$set: req.body
	}, function(err, product) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(product);
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
	/*ProductChild.paginate({}, {
		sort: req.query.order,
		populate: [{
			path: 'user',
			select: 'displayName email -_id'
		}, {
			path: 'product',
			select: 'name code price priceSell -_id'
		}],
		lean: true,
		page: req.query.page || 1,
		limit: req.query.limit || 10
	}).then(function(products) {

		res.json(products);

	});*/

	ProductChild.find({})
		.populate('user', 'displayName email -_id')
		.populate('product', 'name code price priceSell -_id')
		.exec(function(err, products) {

			res.json(products);

		});
};

/**
 * [getByCode description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getByCode = function(req, res) {

	Product.findOne({
		code: new RegExp(req.params.code, 'i')
	}).exec(function(err, product) {
		if (err) {

		} else {
			ProductChild.find({
				product: mongoose.Types.ObjectId(product.id)
			}).exec(function(err, products) {
				product.products = products;
				res.json(product);
			});
		}

	});
	/*ProductChild.find({
		product: req.params.code
	}, function(err, products) {
		if (err) {
			res.json(err);
		}
		res.json(products);
	});*/
};

/**
 * [getAllProduct description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getAllProduct = function(req, res) {
	ProductChild.find()
		.populate('product', 'name code priceSell _id')
		.exec(function(err, products) {
			if (err) {
				return res.status(403).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(products);
			}

		});
};