
const AbstractRoute = require('../AbstractRoute')
const httpMethods = require('../../utils/httpMethods');
const routes = require('../routes');
class BaseRoute extends AbstractRoute {
    constructor(method, path, dynamic) {
        super(method, path, dynamic);
    }

    // define the controller
    controller(req, res, stream, headers) {
        // append all the necessary headers
        headers.appendContentType('text/html; charset=utf-8');
        headers.setStatus(200);

        // respond
        stream.respond(headers.getHeaders());
        stream.end('<h1> Hello World! <h1/>', () => {console.log(`Stream ${stream.id} finished`)});
    }
}

// instantiate the route and export it
const baseRoute = new BaseRoute(httpMethods.GET, '/', false);
// add it to the routes array
routes.push(baseRoute);

