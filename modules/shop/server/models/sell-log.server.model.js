'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timestamps = require('mongoose-timestamp');

/**
 * SellLog Schema
 */
var SellLogSchema = new Schema({
	// SellLog model fields
	product: {
		type: Schema.Types.ObjectId,
		ref: 'ProductChild'
	},
	invoice: {
		type: Schema.Types.ObjectId,
		ref: 'Invoice'
	},
	quantity: {
		type: Number
	}
});



SellLogSchema.plugin(timestamps);

mongoose.model('SellLog', SellLogSchema);