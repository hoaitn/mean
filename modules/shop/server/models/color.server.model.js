'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Color Schema
 */
var ColorSchema = new Schema({
	// Color model fields   
	name: {
		type: String,
	},
	code: {
		type: String,
		unique: true
	}
});

mongoose.model('Color', ColorSchema);