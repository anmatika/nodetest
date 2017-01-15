const dns = require('../app/dns');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
chai.should();

describe('dns', () => {
    const expectedIp = '104.20.22.46';

    it('should resolve', () => {
        return dns.lookup('nodejs.org')
            .should.eventually.resolve

    });
});
