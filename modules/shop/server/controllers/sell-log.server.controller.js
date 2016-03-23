'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	SellLog = mongoose.model('SellLog'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');

/**
 * Create a Sell log
 */
exports.create = function(req, res) {

};

/**
 * Show the current Sell log
 */
exports.read = function(req, res) {

};

/**
 * Update a Sell log
 */
exports.update = function(req, res) {

};

/**
 * Delete an Sell log
 */
exports.delete = function(req, res) {

};

/**
 * List of Sell logs
 */
exports.list = function(req, res) {
	SellLog.find()
		.populate({
			path: 'product',
			populate: {
				path: 'product',
				model: 'Product'
			}
		})
		.populate('invoice')
		.exec(function(err, items) {
			if (err) {
				return res.status(403).json({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.json(items);
			}

		});
};