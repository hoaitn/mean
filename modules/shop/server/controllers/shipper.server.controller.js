'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Shipper = mongoose.model('Shipper'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.create = function(req, res) {
	var shipper = new Shipper(req.body);
	shipper.save(function(err) {
		res.json(shipper);
	});
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	Shipper.findById(req.params.shipperId, function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(item);
	});
};

/**
 * Update a 
 */
exports.update = function(req, res) {
	Shipper.findByIdAndUpdate(req.params.shipperId, {
		$set: req.body
	}, function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(item);
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
	Shipper.find({})
		.exec(function(err, items) {
			if (err) {
				res.status(400).json({
					message: 'Not found'
				});
			}
			res.json(items);

		});
};