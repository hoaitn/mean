'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Invoice = mongoose.model('Invoice'),

	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var Transaction = require('mongoose-transaction')(mongoose);

/**
 * Create a 
 */
exports.create = function(req, res) {
	var cart = new Invoice(req.body);
	cart.createdBy = req.user;
	cart.save(function(err, inv) {
		if (err) {
			return res.status(400).send(err);
		}
		return res.json(inv);
	});
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	Invoice.findOne({
			_id: req.params.cartId,
			isLocked: false
		})
		//.populate('products.product')
		.populate({
			path: 'products.product',
			// Get friends of friends - populate the 'friends' array for every friend
			populate: {
				path: 'product',
				model: 'Product'
			}
		})
		.populate('shipper')
		.exec(function(err, cart) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			if (!cart) {
				return res.status(404).send({
					message: 'Cart not found!'
				});
			} else {
				res.json(cart);
			}

		});
};

/**
 * Update a 
 */
exports.update = function(req, res) {
	Invoice.findOneAndUpdate({
		_id: req.params.cartId,
		isLocked: false
	}, {
		$set: req.body
	}, function(err, cart) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		Invoice.findById(cart._id).populate('products.product').exec(function(err, cart) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(cart);
		});
	});
};

/**
 * Delete an 
 */
exports.delete = function(req, res) {
	var cart = req.cart;
	cart.deletedBy = req.user;
	cart.softdelete(function(err, item) {
		if (err) {
			return res.status(404).json({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(item);
	});
};

/**
 * List of 
 */
exports.list = function(req, res) {
	/*Invoice.paginate({
		isLocked: false
	}, {
		sort: req.query.order,
		populate: [{
			path: 'products.product',
			select: 'name product_code image price total total_sell'
		}, {
			path: 'createdBy',
			select: 'displayName'
		}],
		lean: true,
		page: req.query.page || 1,
		limit: req.query.limit || 10
	}).then(function(carts) {

		res.json(carts);

	});*/

	Invoice.find({
			isLocked: false,
			deleted: false
		})
		.populate('products.product', 'name product_code image price total total_sell')
		.populate('createdBy', 'displayName')
		.populate('shipper')
		.exec(function(err, invoices) {
			if (err) {
				return res.status(403).json({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(invoices);
			}
		});
};

/**
 * [cartByID description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @param  {[type]}   id   [description]
 * @return {[type]}        [description]
 */
exports.cartByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Invoice is invalid'
		});
	}
	Invoice.findById(id)
		.populate({
			path: 'products.product',
			// Get friends of friends - populate the 'friends' array for every friend
			populate: {
				path: 'product',
				model: 'Product'
			}
		})
		.populate('shipper')
		.exec(function(err, item) {
			if (err) {
				next(err);
			} else if (item) {
				req.cart = item;
				next();
			} else {
				next(new Error('failed to load order'));
			}

		});
};

/**
 * Verify cart
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.active = function(req, res) {
	Invoice.findOne({
		_id: req.params.cartId,
		isLocked: false
	}).exec(function(err, cart) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		if (!cart) {
			return res.status(404).send({
				message: 'Cart not found!'
			});
		} else {
			cart.isLocked = true;
			cart.status = 3;
			cart.activeBy = req.user;

			cart.save(function(err, info) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					cart.active(function(err) {

					});
					res.json(info);
				}
			});
		}

	});
};