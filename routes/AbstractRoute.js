const Headers = require('../utils/Headers')

/**
 * Abstract class to represent a Route
 * The constructor takes three arguments
 * method, path, dynamic
 */
class AbstractRoute {
    /**
     *
     * @param method
     * @param path
     * @param dynamic
     */
    constructor(method, path, dynamic) {
        // check that this class is never instantiated
        if (this.constructor === AbstractRoute)
            throw new Error(`Abstrac Class Route should not be instantiated`)
        this.method = method;
        this.path = path;
        this.dynamic = dynamic;
    }

    /**
     * Checks if the given method and path match the corresponding route object
     * @param {String} method
     * @param {String} path
     * @return {boolean} true if they match
     */
    match(method, path) {
        if (method !== this.method) {
            // not the same http method
            return false;
        }

        // check if it is the same path
        if (path === this.path) {
            return true;
        }
        // no the same path
        return false;
    } // end of match method

    /**
     * holds the logic to execute the logic when visiting the page
     * @param {Http2ServerRequest} req
     * @param {Http2ServerResponse} res
     * @param {Http2Stream} stream
     * @param {Headers} headers
     */
    controller(req, res, stream, headers) {
        throw new Error(`Abstract method should be implemented`);
    }

} // end of AbstractRoute

module.exports = AbstractRoute;