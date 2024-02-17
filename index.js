const http2 = require('node:http2');
const fs = require('node:fs');
const path = require('node:path');
const routes = require('./routes/routes');
const requireDir = require('require-dir')
// require all the base routes
const baseRoutes = requireDir('./routes/baseRoutes');
// require all the profile routes, so that they are added to the array
const profileRoutes = requireDir('./routes/profileRoutes');
// function to process every single request
const processRequest = require('./utils/processRequest');

// headers
const initializeHeaders = require('./utils/initializeHeaders');

const server = http2.createSecureServer({
    key: fs.readFileSync("/Users/jjgon/Documents/https_certs/key.pem"),
    cert: fs.readFileSync("/Users/jjgon/Documents/https_certs/cert.pem"),
    settings: {
        maxFrameSize: 1000000, // amount of maximum payload per frame sent
        initialWindowSize: 1000000 // window size for the sender
    }
})

// session event
server.on('session', session => {
    session.on('localSettings', s => {
        console.log(`there are new settings!`);
    })
   /*
    console.log(`There is a new session`);
    console.log(`The local settings are:`);
    console.log(session.localSettings);
    session.setLocalWindowSize(1000); // 50k
    session.settings({maxFrameSize: 20000});
    console.log(`The new settings should be`);
    console.log(session.localSettings);
    */
})

server.on('connection', socket => {
    console.log(`A new TCP stream has been established, before the TLS handshake at: ${Date.now()}`);
})

server.on('request', (req, res) => {
    const headers = initializeHeaders();
    // on each request, process the request
    processRequest(req, res, req.stream, headers);
})

server.listen(8443, () => {console.log(`HTTP/2 server up an running in port 8443`)});