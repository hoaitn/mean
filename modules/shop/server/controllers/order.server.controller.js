'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Order = mongoose.model('Order'),
	Invoice = mongoose.model('Invoice'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');

/**
 * Create a Order
 */
exports.create = function(req, res) {

};

/**
 * Show the current Order
 */
exports.read = function(req, res) {
	Order.findById(req.params.orderId)
		.populate('member')
		.populate({
			path: 'products.product',
			model: 'ProductChild',
			// Get friends of friends - populate the 'friends' array for every friend
			populate: {
				path: 'product',
				model: 'Product'
			}
		})
		.exec(function(err, item) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(item);
		});
};

/**
 * Update a Order
 */
exports.update = function(req, res) {

};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {

};

/**
 * List of Orders
 */
exports.list = function(req, res) {
	Order.find()
		.sort('isLocked')
		.sort('-createdAt')
		.populate('user')
		.populate('member')
		.populate('activeBy')
		.exec(function(err, items) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(items);
			}

		});
};

/**
 * [orderById description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @param  {[type]}   id   [description]
 * @return {[type]}        [description]
 */
exports.orderById = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Order is invalid'
		});
	}
	Order.findById(id)
		.populate('user')
		.populate('member')
		.exec(function(err, item) {
			if (err) {
				next(err);
			} else if (item) {
				req.order = item;
				next();
			} else {
				next(new Error('failed to load order'));
			}

		});
};

/**
 * [read description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.listInvoice = function(req, res) {
	Invoice.find({
			order: req.order._id
		})
		.populate('createdBy')
		.populate('activeBy')
		.exec(function(err, item) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(item);
		});
};

/**
 * [active description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.active = function(req, res) {
	var order = req.order;
	if (!order.isLocked) {
		order.isLocked = true;
		order.activeBy = req.user;
		order.save(function(err, item) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			res.json(item);
		});
	} else {
		return res.status(400).send({
			message: 'Item already active'
		});
	}
};

/**
 * [listNotActive description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.listNotActive = function(req, res) {
	Order.find({
			isLocked: false
		})
		.sort('-createdAt')
		.exec(function(err, items) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.json(items);
			}

		});
};