/*!
 * node-alfredo
 * Copyright (c) 2014 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

var core = require('./lib/core');

/**
 * Expose `Item`.
 */

exports.Item = require('./lib/item');

/**
 * Expose `feedback`.
 */

exports.feedback = exports.Item.prototype.feedback;

/**
 * Expose `fuzzy` search.
 */

exports.fuzzy = exports.fuzzySearch = require('fuzzy-filter');

/**
 * Expose `keychain` access.
 */

exports.keychain = require('./lib/keychain');

/**
 * Expose core functions.
 */

Object.keys(core).forEach(function(key) {
  exports[key] = core[key];
});