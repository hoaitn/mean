'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Invoice = mongoose.model('Invoice'),
	ProductChild = mongoose.model('ProductChild'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var async = require('async');

/**
 * Create a 
 */
exports.create = function(req, res) {
	var invoice = new Invoice(req.body);
	invoice.isLocked = true;
	var check = _.some(invoice.products, function(n) {
		return n.quantity <= 0;
	});
	if (check) {
		return res.status(400).send({
			message: 'Số lượng mỗi sản phẩm cần lớn hơn 0'
		});
	} else {

		var asyncTasks = [];

		_.forEach(invoice.products, function(product, item) {
			asyncTasks.push(function(cb) {
				ProductChild.checkTotal(product.product, product.quantity, cb);
			});

		});

		async.parallel(asyncTasks, function(err, results) {
			if (err) {
				return res.status(400).send({
					message: 'Sản phẩm đã hết hoặc không tồn tại'
				});
			} else {
				invoice.createdBy = req.user;
				invoice.activeBy = req.user;
				invoice.save(function(err, item) {
					if (err) {
						return res.status(404).json({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						item.active(function(err, data) {
							if (err) {
								return res.status(404).json({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								return res.json(data);
							}
						});
					}
				});

			}
		});

	}
	/*async.waterfall([
		function(callback) {
			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback) {
			// arg1 now equals 'one' and arg2 now equals 'two'
			callback(null, 'three');
		},
		function(arg1, callback) {
			// arg1 now equals 'three'
			callback(null, 'done');
		}
	], function(err, result) {
		// result now equals 'done'    
	});
	*/
	/*invoice.save(function(err, item) {
		if (err) {
			return res.status(403).json({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.json(invoice.products[0].product);
		}
	});*/
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	Invoice.findOne({
			_id: req.params.invoiceId,
			isLocked: true
		})
		.populate({
			path: 'products.product',
			populate: {
				path: 'product',
				model: 'Product'
			}
		})
		.populate('shipper')
		.populate('createdBy')
		.populate('activeBy')
		.populate('order')
		.exec(function(err, item) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			if (!item) {
				return res.status(404).send({
					message: 'Invoice not found!'
				});
			} else {
				res.json(item);
			}

		});
};

/**
 * Update a 
 */
exports.update = function(req, res) {
	Invoice.findByIdAndUpdate(req.params.invoiceId, {
		$set: req.body
	}, function(err, invoice) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		Invoice.findById(invoice._id).populate('products.product').exec(function(err, invoice) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(invoice);
		});
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
	/*Invoice.paginate({
		isLocked: true
	}, {
		sort: req.query.order,
		populate: [{
			path: 'products.product',
			select: 'name product_code image price total total_sell'
		}, {
			path: 'activeBy',
			select: 'displayName'
		}, {
			path: 'createdBy',
			select: 'displayName'
		}],
		lean: true,
		page: req.query.page || 1,
		limit: req.query.limit || 10
	}).then(function(invoices) {

		res.json(invoices);

	});*/

	Invoice.find({
			isLocked: true
		})
		.populate('products.product', 'name product_code image price total total_sell')
		.populate('activeBy', 'displayName')
		.populate('createdBy', 'displayName')
		.populate('shipper')
		.exec(function(err, invoices) {

			res.json(invoices);

		});
};

/**
 * [invoiceByID description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @param  {[type]}   id   [description]
 * @return {[type]}        [description]
 */
exports.invoiceByID = function(req, res, next, id) {
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
				req.invoice = item;
				next();
			} else {
				next(new Error('failed to load order'));
			}

		});
};

/**
 * [dailyReport description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.dailyReport = function(req, res) {
	Invoice.aggregate([{
		$match: {
			isLocked: true
		}
	}], function(err, info) {
		if (err) {
			return res.status(400).send(err);
		}
		res.json(info);
	});
};