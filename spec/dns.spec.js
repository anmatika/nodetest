const dns = require('../app/dns');
const expect = require('chai').expect;

describe('dns', () => {
    const expectedIp = '104.20.22.46';
    it('should resolve correct ip', (done) => {
        const lookup = dns.lookup('nodejs.org').then((lookup)=> {
            expect(lookup).to.equal(expectedIp);
        }).done(() => done());
    });

});
