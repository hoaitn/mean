'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductHistory Schema
 */
var ProductHistorySchema = new Schema({
	// ProductHistory model fields   
	createdAt: {
		type: Date,
		default: Date.now
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	log: {
		type: String
	},
	note: {
		type: String
	}
});

mongoose.model('ProductHistory', ProductHistorySchema);