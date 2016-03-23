'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash'),
	mongooseHistory = require('mongoose-history'),
	timestamps = require('mongoose-timestamp');

var async = require('async');


var options = {
	diffOnly: true,
	customCollectionName: 'history_invoices'
};

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
	// Invoice model fields   
	name: {
		type: String,
		require: true
	},
	customerName: {
		type: String,
		require: true
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
		type: Number
	},
	discount: {
		type: Number
	},
	order: {
		type: Schema.Types.ObjectId,
		ref: 'Order'
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
		status: {
			type: Boolean
		},
		quantity: {
			type: Number,
			default: 1
		}
	}, {
		_id: false
	})],
	status: {
		type: Number,
		enum: [1, 2, 3],
		default: 1,
		required: true
	},
	isLocked: {
		type: Boolean,
		default: false
	},
	sellType: {
		type: Number,
		default: 1
	},
	subTotalPrice: {
		type: Number,
		default: 0
	},
	totalPrice: {
		type: Number,
		default: 0
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	activeBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	shipper: {
		type: Schema.Types.ObjectId,
		ref: 'Shipper'
	}
});

/*InvoiceSchema.pre('update', function() {
	this.update({}, {
		$set: {
			updatedAt: Date.now
		}
	});
});*/

InvoiceSchema.pre('save', function(next) {

	if (!this.totalPrice || this.totalPrice === null) {
		this.totalPrice = this.subTotalPrice - this.discount;
	}
	next();
});


InvoiceSchema.methods.active = function(callback) {
	var self = this;
	var asyncTasks = [];

	_.forEach(this.products, function(product, item) {
		asyncTasks.push(function(cb) {
			self.model('ProductChild').updateSell(product.product, product.quantity, self._id, cb);
		});

	});

	async.parallel(asyncTasks, function(err, results) {
		callback(err, results);
	});

};



InvoiceSchema.plugin(mongooseHistory, options);
InvoiceSchema.plugin(timestamps);
mongoose.model('Invoice', InvoiceSchema);