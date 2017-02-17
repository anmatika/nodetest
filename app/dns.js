const dns = require('dns');
const co = require('co');

const lookup = exports.lookup = (dnsName) => {
    return new Promise((resolve, reject) => {
        dns.lookup(dnsName, (err, addresses, family) => {
            // reject('foo')
            resolve(addresses);
        });
    });
};

function run() {
    co(function* coimpl() {
        // lookup('nodejs.org').then((res)=> console.log('ready: ' + res));
        const value = yield lookup('nodejs.org');
        console.log(value);
    }).catch((err) => { console.log(err)})
}

if (process.argv[2] === 'run') {
    run();
}
