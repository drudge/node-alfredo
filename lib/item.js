/*!
 * node-alfredo
 * Copyright (c) 2014 Nicholas Penree <nick@penree.com>
 * MIT Licensed
 */

var js2xmlparser = require('js2xmlparser');
var format = require('util').format;
var crypto = require('crypto');
var core = require('./core');

/**
 * Return a random string of specified length.
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */

var getRandBits = function(len) {
  return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0, len);
};

/**
 * Creates an instance of an `Item`.
 *
 * @constructor
 * @this {Item}
 * @param {Object} args
 * @api public
 */

function Item(args) {
  args = args || {};
  this.title = args.title || '';
  this.subtitle = args.subtitle || '';
  this.uid = args.uid || format('%s.%s', core.bundleSync(), getRandBits(12));
  this.autocomplete = args.autocomplete;
  this.icon = args.icon || 'icon.png';
  this.fileIcon = (typeof args.fileIcon !== 'undefined') ? args.fileIcon : false;
  this.fileType = (typeof args.fileType !== 'undefined') ? args.fileType : false;
  this.arg = args.arg;
  this.type = args.type;
  
  if (typeof args.valid !== 'undefined') {
    if (args.valid === true) this.valid = 'yes';
    else if (args.valid === false) this.valid = 'no';
    else this.valid = args.valid;
  }
}

/**
 * Returns the current values for the item in the following format. Primarily 
 * used with the `feedback()` method.
 *
 * @return {Object}
 * @api public
 */

Item.prototype.get = function() {
  var self = this;
  var content = {
    title: self.title,
    subtitle: self.subtitle,
    icon: self.icon,
    '@': {}
  };
  
  if (self.fileType === true) content.type = 'filetype';
  if (self.fileIcon === true) content.type = 'fileicon';
  if (self.autocomplete) content['@'].autocomplete = self.autocomplete;
  if (self.uid) content['@'].uid = self.uid;
  if (self.valid) content['@'].valid = self.valid;
  
  if (self.arg) {
    if (self.arg.indexOf('\n') !== -1) {
      content.arg = self.arg;
    } else {
      content['@'].arg = self.arg;
    }
  }
  
  if (self.type) content['@'].type = self.type;

  return content;
};

/**
 * Takes either an individual item or a list of items for items and prints a 
 * UTF-8-encoded XML string for Alfred to interpret
 *
 * @param {Array|Item} items - optional
 * @api public
 */

Item.prototype.feedback = function(items) {
  if (!items && this instanceof Item) items = [this];
  
  items = Array.isArray(items) ? items : [items];
  
  var out = [ '<items>' ];
  
  items.forEach(function(item) {
    out.push(js2xmlparser('item', item.get(), {
      declaration: { include: false },
      prettyPrinting: { enabled: false }
    }));
  });
  
  out.push('</items>');
  
  console.log(out.join(''));
};

/**
 * Expose `Item`.
 */

module.exports = Item;