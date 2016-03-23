'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Promo Schema
 */
var PromoSchema = new Schema({
	// Promo model fields
	code: {
		type: String,
		unique: true,
		required: true
	}
});

mongoose.model('Promo', PromoSchema);