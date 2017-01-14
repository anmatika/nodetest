// import mocha from 'mocha';
// import assert from 'assert';
// const assert = require('assert');
// const enc = require('../app/encrypt_decrypt');

import assert from 'assert';
import enc from '../app/encrypt_decrypt';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-2, [1,2,3].indexOf(4));
    });
  });
});

describe('enc', function() {
  it('should decrypt', function() {
   const hash = enc.encrypt('foo', 'bar');

    console.log(hash);
    assert(hash == 'db4342');

  });
});
