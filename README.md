## Simple PBKDF2 Authentication

Simple authentication for Node.js based on the crypto standard PBKDF2 for secure key generation.

The hashing mechanism uses a random 16-byte salt, 32-byte derived key and 10,000 iterations. It takes about 100 ms on modern hardware in 2013. The encoded form contains the salt and key encoded as base64.

## Usage

    var pbkdf2 = require('pbkdf2-auth');
    
    // encode a password (sync)
    var encoded = pbkdf2.encodePasswordSync("secret");
    
    // encode a password (async)
    pbkdf2.encodePassword("secret", function (encoded) {
        // do something with 'encoded' ...
    });
    
    // verify a password (sync)
    if (pbkdf2.isValidPassword(encoded, "secret")) {
        // authentication successful ...
    } else {
        // authentication failed ...
    }
    
    // verify a password (async)
    if (pbkdf2.checkPassword(encoded, "secret", function () {
        // authentication successful ...
    }, function () {
        // authentication failed ...
    });


## License

Copyright &copy; 2013 Matt Ryall.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

