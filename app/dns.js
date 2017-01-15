const dns = require('dns');
const q = require('q');

const lookup = exports.lookup = (dnsName) => {
    const deferred = q.defer();
    dns.lookup(dnsName, (err, addresses, family) => {
        console.log('addresses:', addresses);
        deferred.resolve(addresses);
    });

    return deferred.promise;
};


// lookup('nodejs.org').then((res)=> console.log('ready: ' + res));
