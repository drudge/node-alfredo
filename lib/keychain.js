var keychain = require('keychain');

/**
 * Retreive a password from the keychain.
 *
 * @param {Object} opts Object containing `account` and `service`
 * @return {String} password
 * @api public
 */

exports.getPasswordSync = function(opts) {
  var password;
  var done = false;

  keychain.getPassword(opts, function(err, pass) {
    if (err) throw err;

    password = pass;
    done = true;
  });

  while(!done){}

  return password;
};

/**
 * Set/update a password in the keychain.
 *
 * @param {Object} opts Object containing `account`, `service`, and `password`
 * @api public
 */

exports.setPasswordSync = function(opts) {
  var done = false;

  keychain.setPassword(opts, function(err) {
    if (err) throw err;
    done = true;
  });

  while(!done){}
};

/**
* Delete a password from the keychain.
*
* @param {Object} opts Object containing `account`, `service`, and `password`
* @api public
*/

exports.deletePasswordSync = function(opts) {
  var done = false;

  keychain.deletePassword(opts, function(err) {
    if (err) throw err;
    done = true;
  });

  while(!done){}
};