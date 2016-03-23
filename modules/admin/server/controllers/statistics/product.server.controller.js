'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	ProductChild = mongoose.model('ProductChild'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
	_ = require('lodash');


/**
 * List of Product
 */
exports.filterProduct = function(req, res) {
	ProductChild
		.aggregate([{
			$group: {
				_id: null,
				total: {
					$sum: '$total'
				},
				available: {
					$sum: '$available'
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