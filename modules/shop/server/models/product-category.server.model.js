'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('slug');

/**
 * ProductCategory Schema
 */
var ProductCategorySchema = new Schema({
	// ProductCategory model fields   
	name: {
		type: String,
		require: true
	},
	slug: {
		type: String,
		require: true,
		unique: true
	}
});

ProductCategorySchema.pre('save', function(next) {
	if (!this.slug || this.slug === null) {
		this.slug = slug(this.name, {
			lower: true
		});
	}
	next();
});

mongoose.model('ProductCategory', ProductCategorySchema);