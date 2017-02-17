const dns = require('../app/dns');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe('dns', () => {
    const expectedIp = '104.20.22.46';

    it('should resolve', () => {
        return dns.lookup('nodejs.org')
            .should.eventually.resolve

    });
    it('should resolve', function* () {
        const value = yield dns.lookup('nodejs.org');
        console.log(value)
        assert.equal(value, 'fdfd');

    });
});
