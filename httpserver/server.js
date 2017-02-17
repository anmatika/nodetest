var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(res);
    } else {
        res.end('foo');
    }
});
server.listen(8000);
