'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('slug'),
	timestamps = require('mongoose-timestamp');
/**
 * Product Schema
 */
var ProductChildSchema = new Schema({

	name: {
		type: String
	},
	product: {
		type: Schema.Types.ObjectId,
		require: true,
		ref: 'Product'
	},
	total: {
		type: Number,
		default: 0,
		min: [0, 'Số lượng không hợp lệ']
	},
	available: {
		type: Number,
		default: 0,
		min: [0, 'Không còn hàng']
	},
	totalSell: {
		type: Number,
		default: 0
	},
	size: {
		type: String,
		trim: true,
		require: true
	},
	color: {
		type: String
	},
	gender: {
		type: Number,
		require: true,
		default: 1
	},
	images: [{
		type: String,
		trim: true
	}],
	image: {
		type: String,
		trim: true
	},
	description: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	strict: false
});

ProductChildSchema.index({
	product: 1,
	size: 1
}, {
	unique: 'Size với mã này đã tồn tại trong hệ thống'
});

ProductChildSchema.pre('validate', function(next) {
	if (this.available < 0) {
		next(Error('Total must be more than total Sell'));
	} else {
		next();
	}
});

ProductChildSchema.statics.updateSell = function(id, quantity, invoice, cb) {
	var self = this;
	var SellLog = self.model('SellLog');

	this.findOne({
		_id: id,
		available: {
			$gte: quantity
		}
	}).exec(function(err, prod) {
		if (err) {
			cb(err);
		} else {
			prod.available -= quantity;

			prod.save(function(er, succ) {
				if (er) {
					cb(er);
				} else {
					var log = new SellLog();
					log.product = prod;
					log.invoice = invoice;
					log.quantity = quantity;
					log.save();
					cb(null, succ);
				}
			});
		}
	});
};

ProductChildSchema.statics.checkTotal = function(id, quantity, cb) {
	this.findOne({
		_id: id,
		available: {
			$gte: quantity
		}
	}).exec(function(err, data) {
		if (err) {
			cb(err);
		}
		if (data) {
			cb(null, data);
		} else {
			cb(Error('Error'));
		}

	});
};
ProductChildSchema.plugin(timestamps);
mongoose.model('ProductChild', ProductChildSchema);