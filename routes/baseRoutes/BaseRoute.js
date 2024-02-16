
const AbstractRoute = require('../AbstractRoute')
const httpMethods = require('../../utils/httpMethods');
const routes = require('../routes');
class BaseRoute extends AbstractRoute {
    constructor(method, path, dynamic) {
        super(method, path, dynamic);
    }

    // define the controller
    controller(req, res, stream) {
        stream.respond({
            'content-type': 'text/html; charset=utf-8',
            ':status': 200,
            'access-control-allow-origin': 'https://localhost:8080',
            'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS'

        })
        console.log(`The stream sent headers:`);
        console.log(stream.sentHeaders)
        stream.end('<h1> Hello World! <h1/>', () => {console.log(`Stream finisheeeedddd`)});
    }
}

// instantiate the route and export it
const baseRoute = new BaseRoute(httpMethods.GET, '/', false);
module.exports = baseRoute;
