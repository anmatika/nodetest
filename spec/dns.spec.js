const dns = require('../app/dns');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.use(require('chai-string'));
const expect = chai.expect;
chai.should();

describe('dns', () => {
    const expectedIp = '104.20.22.46';
    it('should resolve correct ip', (done) => {
        const lookup = dns.lookup('nodejs.org')
            .then((lookup) => {
                expect(lookup).to.equal(expectedIp);
            })
            .done(() => done());
    });

    it('should resolve correct ip 2', () => {
        return dns.lookup('nodejs.org')
            .should.eventually.equal(expectedIp)

    });
});
