#!/usr/bin/env node

const crypto = require('crypto');
const q = require('q');

const encrypt = (secret, message) => {
    const cipher = crypto.createCipher('aes192', secret);


    let encrypted = cipher.update(message, 'utf8', 'hex');
    hash += cipher.final('hex');
    console.log(`crypted message: ${message}`);
  console.log(`hash: ${hash}`);
    return hash;
};

const decrypt = (hash, secret) => {
    const deferred = q.defer();
    const decipher = crypto.createDecipher('aes192', secret);

    let decrypted = '';
    decipher.on('readable', () => {
        const data = decipher.read();
        if (data) {
            decrypted += data.toString('utf8');
        }
    });
    decipher.on('end', () => {
      deferred.resolve(decrypted);
        // Prints: some clear text data
    });

    decipher.write(hash, 'hex');
    decipher.end();
  return deferred.promise;

};

let message = process.argv[2];
if (message === undefined) {
    message = 'some clear text data';
}

const secret = 'abcdefg';

const hash = encrypt(secret, message);
decrypt(hash, secret).then(res => console.log(`decrypted: ${res}`));


exports.encrypt = encrypt;
exports.decrypt = decrypt;
