const http2 = require('node:http2');
const fs = require('node:fs');
const path = require('node:path');
const routes = require('./routes/routes');
const requireDir = require('require-dir')
// require all the base routes
const baseRoutes = requireDir('./routes/baseRoutes');

// function to process every single request
const processRequest = require('./utils/processRequest');

// headers
const initializeHeaders = require('./utils/initializeHeaders');

const server = http2.createSecureServer({
    key: fs.readFileSync("/Users/jjgon/Documents/https_certs/key.pem"),
    cert: fs.readFileSync("/Users/jjgon/Documents/https_certs/cert.pem")

})

server.on('stream', (stream, headers) => {
    //console.log(`A new Stream has been received at: ${Date.now()}`);
    //console.log(`Bufferred characters ready to be written: ${stream.bufferSize}`);
    stream.on('close', () => {
        console.log(`Stream closed with error: ${stream.rstCode}`);
    })

    stream.on('finish', ()=> {console.log(`All the data has been flushed to the underlying system`)});

})

server.on('connection', socket => {
    console.log(`A new TCP stream has been established, before the TLS handshake at: ${Date.now()}`);
})

server.on('request', (req, res) => {
    console.log(routes);
    const headers = initializeHeaders();
    // on each request, process the request
    processRequest(req, res, req.stream);
})

server.listen(8443);