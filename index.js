var crypto = require('crypto');

// same values as atlassian-security: 16-byte salt, 256-bit key, 10k iterations
var saltLen = 16;
var keyLen = 32;
var iter = 10000;

// returns an auth string consisting of (salt + key), encoded as base64
function toAuthString(salt, key) {
    return Buffer.concat([salt, key]).toString('base64');
}

// splits the auth string into the salt and key
function fromAuthString(auth) {
    var bytes = new Buffer(auth, 'base64');
    var salt = bytes.slice(0, saltLen);
    var key = bytes.slice(saltLen);
    return [ salt, key ];
}

exports.encodePasswordSync = function (password) {
    var salt = crypto.randomBytes(saltLen);
    var key = crypto.pbkdf2Sync(password, salt, iter, keyLen);
    return toAuthString(salt, key);
};

exports.encodePassword = function (password, callback) {
    var salt = crypto.randomBytes(saltLen);
    crypto.pbkdf2(password, salt, iter, keyLen, function (err, key) {
        callback(err, toAuthString(salt, key));
    });
};

exports.isValidPassword = function (password, auth) {
    // split out salt and key
    var components = fromAuthString(auth);
    var salt = components[0];
    var key = components[1];

    // rehash and compare
    var rehash = crypto.pbkdf2Sync(password, salt, iter, keyLen);    
    return key.toString('hex') == rehash.toString('hex');
};

exports.checkPassword = function (password, auth, successCallback, failureCallback) {
    // split out salt and key
    var components = fromAuthString(auth);
    var salt = components[0];
    var key = components[1];

    // rehash and compare
    crypto.pbkdf2(password, salt, iter, keyLen, function (err, rehash) {
        if (key.toString('hex') == rehash.toString('hex')) {
            successCallback && successCallback();
        } else {
            failureCallback && failureCallback();
        }
    });
};

