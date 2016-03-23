'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Color = mongoose.model('Color'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.create = function(req, res) {
	var color = new Color(req.body);
	color.save(function(err, info) {
		if (err) {
			res.status(403).send(err);
		}
		res.json(info);
	});
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	Color.findById(req.params.colorId, function(err, item) {
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
	Color.findByIdAndUpdate(req.params.colorId, {
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
	Color.find().sort('name').exec(function(err, colors) {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json(colors);
		}

	});
};