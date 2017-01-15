const assert = require('assert');
const enc = require('../app/encrypt_decrypt');

describe('enc', () => {
  it('should decrypt', () => {
        const secret = 'foo';
        const message = 'bar';
        const hash = enc.encrypt(secret, message);


        console.log(`hash: ${hash}`);
        assert(hash === '2f54c0e3b8016d34537e3237ad7536a8');
    });
});
