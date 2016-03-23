'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Member Schema
 */
var MemberSchema = new Schema({
	// Member model fields
	firstName: {
		type: String,
		trim: true,
		default: ''
	},
	lastName: {
		type: String,
		trim: true,
		default: ''
	},
	displayName: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	username: {
		type: String,
		unique: 'Username already exists',
		required: 'Please fill in a username',
		lowercase: true,
		trim: true
	},
	password: {
		type: String
	},
	salt: {
		type: String
	},
	profileImageURL: {
		type: String,
		default: 'modules/users/client/img/profile/default.png'
	},
	createdAt: {
		type: Date
	},
});

mongoose.model('Member', MemberSchema);