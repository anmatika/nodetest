const enc = require('../app/encrypt_decrypt');
const expect = require('chai').expect;

describe('enc', () => {
  const expectedHash = '2f54c0e3b8016d34537e3237ad7536a8';
    it('should decrypt', () => {
        const secret = 'foo';
        const message = 'bar';
        const hash = enc.encrypt(secret, message);

        console.log(`hash: ${hash}`);
        expect(hash).to.equal(expectedHash);
    });

  it('should fail decrypt when secret changed', () => {
    const secret = 'foo2';
    const message = 'bar';
    const hash = enc.encrypt(secret, message);

    console.log(`hash: ${hash}`);
    expect(hash).not.to.equal(expectedHash);
  });
});
