'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	path = require('path'),
	config = require(path.resolve('./config/config')),
	fs = require('fs'),
	multer = require('multer');

/**
 * Create a 
 */
exports.create = function(req, res) {

};

/**
 * Show the current 
 */
exports.read = function(req, res) {

};

/**
 * Update a 
 */
exports.update = function(req, res) {

};

/**
 * Delete an 
 */
exports.delete = function(req, res) {

};

/**
 * List of 
 */
exports.list = function(req, res) {

};

/**
 * Upload
 */

exports.upload = function(req, res) {
	var upload = multer(config.uploads.productUpload).single('image');
	var productUploadFileFilter = require(path.resolve('./config/lib/multer')).productUploadFileFilter;
	upload.fileFilter = productUploadFileFilter;

	upload(req, res, function(uploadError) {
		if (uploadError) {
			return res.status(400).send({
				message: 'Error occurred while uploading image'
			});
		} else {

			return res.send({
				/*image: '/' + config.uploads.productUpload.dest + req.file.filename*/
				image: config.uploads.path + req.file.filename
			});
		}
	});
};