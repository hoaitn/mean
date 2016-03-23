'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('slug'),
	autoIncrement = require('mongoose-auto-increment'),
	timestamps = require('mongoose-timestamp'),
	path = require('path'),
	config = require(path.resolve('./config/config'));

var connection = mongoose.createConnection(config.db.uri);

autoIncrement.initialize(connection);
/**
 * Product Schema
 */
var ProductSchema = new Schema({
	// Product model fields	
	name: {
		type: String,
		require: true,
		trim: true
	},
	slug: {
		type: String,
		unique: 'Link thân thiện phải là duy nhất',
		trim: true
	},
	images: [{
		type: String,
		trim: true
	}],
	code: {
		type: String,
		unique: 'Mã sản phẩm phải là duy nhất'
	},
	price: {
		type: Number,
		trim: true,
		default: 0,
		min: [0, 'Giá không hợp lệ']
	},
	priceSell: {
		type: Number,
		trim: true,
		default: 0,
		min: [0, 'Giá bán không hợp lệ']
	},
	priceSale: {
		type: Number,
		min: [0, 'Giá không hợp lệ']
	},
	discount: {
		type: Number,
		default: 0,
		min: [0, 'Giảm giá không hợp lệ']
	},
	colorType: {
		type: Schema.Types.ObjectId,
		ref: 'Color'
	},
	gender: {
		type: Number,
		enum: [1, 2, 3],
		require: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'ProductCategory'
	},
	hasNew: {
		type: Boolean,
		default: false
	},
	description: {
		type: String
	},
	content: {
		type: String
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'ProductChild'
	}],
	position: {
		type: Number,
		enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	},
});



ProductSchema.pre('save', function(next) {
	if (!this.slug || this.slug === null) {
		this.slug = slug(this.name, {
			lower: true
		});
	}
	next();
});

ProductSchema.pre('update', function() {
	if (!this.slug || this.slug === null) {
		var slug = slug(this.name, {
			lower: true
		});

		this.update({}, {
			$set: {
				slug: slug
			}
		});
	}
});


ProductSchema.plugin(autoIncrement.plugin, {
	model: 'Product',
	field: 'productId',
	startAt: 1,
	incrementBy: 1
});

ProductSchema.plugin(timestamps);

mongoose.model('Product', ProductSchema);