'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Invoice = mongoose.model('Invoice'),
	SellLog = mongoose.model('SellLog'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');

/**
 * Create a Statistic
 */
exports.create = function(req, res) {

};

/**
 * Show the current Statistic
 */
exports.read = function(req, res) {

};

/**
 * Update a Statistic
 */
exports.update = function(req, res) {

};

/**
 * Delete an Statistic
 */
exports.delete = function(req, res) {

};

/**
 * List of Statistics
 */
exports.filterInvoice = function(req, res) {
	Invoice
		.aggregate([{
			$match: {
				isLocked: true
			}
		}, {
			$sort: {
				createdAt: -1
			}
		}, {
			$group: {
				_id: {
					month: {
						$month: '$createdAt'
					},
					day: {
						$dayOfMonth: '$createdAt'
					},
					year: {
						$year: '$createdAt'
					}
				},
				totalPrice: {
					$sum: '$totalPrice'
				},
				count: {
					$sum: 1
				}
			}
		}])
		.exec(function(err, items) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(items);
		});
};

/**
 * [filterInvoice description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.filterSell = function(req, res) {
	SellLog
		.aggregate([{
			$sort: {
				createdAt: -1
			}
		}, {
			$group: {
				_id: {
					month: {
						$month: '$createdAt'
					},
					day: {
						$dayOfMonth: '$createdAt'
					},
					year: {
						$year: '$createdAt'
					}
				},
				totalSell: {
					$sum: '$quantity'
				},
				count: {
					$sum: 1
				}
			}
		}])
		.exec(function(err, items) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}

			res.json(items);
		});
};