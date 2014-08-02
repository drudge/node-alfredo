/*!
 * node-alfredo
 * Copyright (c) 2014 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

var plist = require('plist');
var path = require('path');
var fs = require('fs');

var bundleID;

/**
 * Read a property list `file` at specified path into an object.
 *
 * @param {String} file name
 * @return {Object}
 * @api public
 */

exports.readPlistSync = function(file) {
  return plist.parse(fs.readFileSync(path.resolve(file), 'utf8'));
};

/**
 * Write an object to a property list `file` at specified path.
 *
 * @param {String} file name
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

exports.writePlistSync = function(file, obj) {
  return fs.writeFileSync(file, plist.build(obj), 'utf8');
};

/**
 * Read a JSON `file` at specified path into an object.
 *
 * @param {String} file name
 * @return {Object}
 * @api public
 */

exports.readJSONSync = function(file) {
  return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
};

/**
 * Write an object to a JSON `file` at specified path.
 *
 * @param {String} file name
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

exports.writeJSONSync = function(file, obj) {
  return fs.writeFileSync(file, JSON.stringify(obj), 'utf8');
};

/**
 * Return the bundle identifier for the current Alfred workflow.
 *
 * @return {String}
 * @api public
 */

exports.bundleSync = function() {
  if (bundleID) return bundleID;
  
  var info = exports.readPlistSync('./info.plist');
  
  bundleID = info.bundleid;
  
  if (!bundleID) throw new Error('Bundle ID not defined or readable from info.plist.');
  
  return bundleID;
};