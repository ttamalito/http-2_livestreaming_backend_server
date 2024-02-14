const http2 = require('node:http2');
const fs = require('node:fs');
const path = require('node:path');

const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate', 'cert.pem'))
})

server.on('stream', (stream, headers) => {
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200
    })
    stream.end('<h1> Hello World! <h1/>');
})

server.listen(8443);