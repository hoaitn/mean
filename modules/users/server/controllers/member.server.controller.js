'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Member = mongoose.model('Member'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');

/**
 * Create a Member
 */
exports.create = function(req, res) {

};

/**
 * Show the current Member
 */
exports.read = function(req, res) {
	Member.findById(req.params.memberId, function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

		res.json(item);
	});
};

/**
 * Update a Member
 */
exports.update = function(req, res) {

};

/**
 * Delete an Member
 */
exports.delete = function(req, res) {

};

/**
 * List of Members
 */
exports.list = function(req, res) {
	Member.find().exec(function(err, items) {
		if (err) {
			return res.status(403).json({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			return res.json(items);
		}
	});
};