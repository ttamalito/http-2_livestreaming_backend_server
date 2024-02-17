const AbstractRoute = require('../AbstractRoute')
const separatePath = require('../../utils/separetePath');
const routes = require('../routes');
/**
 * Route to start the livestreaming, (the creator should visit this page)
 */
class OptionsLiveRoute extends AbstractRoute {
    constructor(method, path, dynamic) {
        super(method, path, dynamic);
    }

    match(method, path) {
        // check that they are the same method
        if (method !== this.method) {
            return false;
        }

        // this is a dynamic route, thus we need to separate the path by '/'
        const separatedPath = separatePath(path);
        // check that the length is 2
        if (separatedPath.length !== 2) {
            // its different path, should be /user/live,
            return false;
        }

        // at this point it has length 2, so acdess the second element to check that is the correct one
        if (separatedPath[1] === 'live' ) {
            // we have the correct path
            return true;
        }
        // else is not the correct path
        return false;
    } // end of match

    controller(req, res, stream, headers) {
        // accept the preflight request

        // allow the content type headers
        headers.append('access-control-allow-headers', 'content-type');
        // set the status to no content
        headers.setStatus(204);
        // no payload data will be sent
        stream.respond(headers.getHeaders(), {endStream: true});
        // close the stream
        stream.close();
    } // end of controller


}

const optionsLiveRoute = new OptionsLiveRoute('OPTIONS', '/:user/live', true);
// add it to the array
routes.push(optionsLiveRoute);