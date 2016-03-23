'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Shipper Schema
 */
var ShipperSchema = new Schema({
	// Shipper model fields   
	// ...
	name: {
		type: String,
		require: true
	},
	gender: {
		type: Number,
		enum: [1, 2, 3],
		default: 1
	},
	address: {
		type: String
	},
	phone: {
		type: String
	},
	avatar: {
		type: String
	}
});

mongoose.model('Shipper', ShipperSchema);