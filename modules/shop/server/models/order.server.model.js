'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timestamps = require('mongoose-timestamp');

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	// Order model fields
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	displayName: {
		type: String
	},
	address: {
		type: String
	},
	phone: {
		type: String
	},
	note: {
		type: String
	},
	priceShip: {
		type: Number,
		default: 0
	},
	discount: {
		type: Number
	},
	promoCode: {
		type: Schema.Types.ObjectId,
		ref: 'Promo'
	},
	products: [new Schema({
		product: {
			type: Schema.Types.ObjectId,
			ref: 'ProductChild'
		},
		discount: {
			type: Number,
			default: 0,
		},
		quantity: {
			type: Number,
			default: 1
		},
		isLocked: {
			type: Boolean,
			default: false
		}
	}, {
		_id: false
	})],
	invoices: [{
		type: Schema.Types.ObjectId,
		ref: 'Invoice'
	}],
	totalPaid: {
		type: Number,
		default: 0
	},
	totalRefunded: {
		type: Number,
		default: 0
	},
	totalPrice: {
		type: Number,
		default: 0
	},
	member: {
		type: Schema.Types.ObjectId,
		ref: 'Member'
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'Member'
	},
	activeBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	isLocked: {
		type: Boolean,
		default: false
	}
});

OrderSchema.plugin(timestamps);
mongoose.model('Order', OrderSchema);