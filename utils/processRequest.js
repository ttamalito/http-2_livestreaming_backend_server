const routes = require('../routes/routes.js');



/**
 * Finds the corresponding route and executes the controller of the route
 * @param {Http2ServerRequest} req
 * @param {Http2ServerResponse} res
 * @param {Http2Stream} stream
 */
function processRequest(req, res, stream) {
    console.log(routes)
    console.log(routes.length);
    // get the path
    const path = req.url;
    // get the method
    const method = req.method;
    console.log(`The http method: ${method}`);

    // iterate through all the routes

    for (const route of routes) {
        if (route.match(method, path)) {
            // we have the correct match
            route.controller(req, res, stream);
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