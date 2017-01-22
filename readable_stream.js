const Readable = require('stream').Readable;

const rs = new Readable();
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

rs.pipe(process.stdout);
