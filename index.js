const http2 = require('node:http2');
const fs = require('node:fs');
const path = require('node:path');

const server = http2.createSecureServer({
    key: fs.readFileSync("/Users/jjgon/Documents/https_certs/key.pem"),
    cert: fs.readFileSync("/Users/jjgon/Documents/https_certs/cert.pem")

})

server.on('stream', (stream, headers) => {
    //console.log(`A new Stream has been received at: ${Date.now()}`);
    console.log(`The stream id: ${stream.id}`);
    console.log(`The window size: i.e, number of bytes that can be recieved: ${stream.state.localWindowSize}`);
    console.log(`High Water Mark for the writable: ${stream.writableHighWaterMark}`);
    //console.log(`Bufferred characters ready to be written: ${stream.bufferSize}`);
    stream.on('close', () => {
        console.log(`Stream closed with error: ${stream.rstCode}`);
    })

    stream.on('finish', ()=> {console.log(`All the data has been flushed to the underlying system`)});

    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200,
        'access-control-allow-origin': 'https://localhost:8080',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS'

    })
    stream.end('<h1> Hello World! <h1/>', () => {console.log(`Stream finisheeeedddd`)});
})

server.on('connection', socket => {
    console.log(`A new TCP stream has been established, before the TLS handshake at: ${Date.now()}`);
})

server.on('timeout', () => {
    console.log(`No activity in the server for 2 minutes`);
})

server.on('request', (req, res) => {
    // set a timeout for the request
    req.setTimeout(1, () => {console.log(`The request timed out`)});
    //console.log(`There is a new request at: ${Date.now()}`);
    req.on('close', () => {console.log(`the stream was closed at: ${Date.now()}`)});
    //console.log(`The request headers`);
    //console.log(req.headers);
})

server.listen(8443);