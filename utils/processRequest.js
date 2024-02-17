const routes = require('../routes/routes.js');
const Headers = require('./Headers')


/**
 * Finds the corresponding route and executes the controller of the route
 * It appends the CORS headers to the response
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 * @param {Http2Stream} stream
 * @param {Headers} headers
 */
function processRequest(req, res, stream, headers) {

    // set the CORS headers
    headers.appendCorsHeaders('https://localhost:8080', 'GET, POST, PUT, DELETE, OPTIONS');
    // get the path
    const path = req.url;
    // get the method
    const method = req.method;

    // iterate through all the routes

    for (const route of routes) {
        if (route.match(method, path)) {
            // we have the correct match
            route.controller(req, res, stream, headers);
            return;
        }


    } // end of for loop

    // no matching route
    stream.respond({
        ':status': '404'
    })
    stream.end();

} // end of function


module.exports = processRequest;