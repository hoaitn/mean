'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	ProductCategory = mongoose.model('ProductCategory'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Create a 
 */
exports.create = function(req, res) {
	var category = new ProductCategory(req.body);
	category.save(function(err, cat) {
		if (err) {
			return res.status(400).json({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.json(cat);
		}
	});
};

/**
 * Show the current 
 */
exports.read = function(req, res) {
	ProductCategory.findById(req.params.categoryId, function(err, item) {
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
	ProductCategory.findByIdAndUpdate(req.params.categoryId, {
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
	ProductCategory.find().exec(function(err, items) {
		if (err) {
			return res.status(403).json({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.json(items);
		}
	});
};