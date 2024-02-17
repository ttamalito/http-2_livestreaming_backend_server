/**
 * This class represents the headers object, and contains various methods to append headers and perform
 * operations on the corresponding object
 */
class Headers {
    constructor() {
        this.headers = {}; // empty object
    }

    /**
     * Getter for the headers object
     * @return {{}}
     */
    getHeaders() {
        return this.headers;
    }

    // methods to perform actions
    /**
     * Appends the corresponding key value pair to the headers object
     * @param {String} key
     * @param {String} value
     */
    append(key, value) {
        // append the key value pair to the object
        this.headers[key] = value;
    }


    /**
     * Appends the Content-Type header to the headers
     * @param type
     */
    appendContentType( type) {
        // append the content-type header
        this.append('content-type', type);
    }

    /**
     * Sets the status of the object to be sent
     * @param {number} code The HTTP status code
     */
    setStatus(code) {
        this.append(':status', code);
    }

    /**
     * Appends the Access-Control-Allow-Origin
     * and Access-Control-ALlow-Methods headers
     * with the respective origin and methods
     * @param {String} origin
     * @param {String} methods
     */
    appendCorsHeaders(origin, methods) {
        this.append('access-control-allow-origin', origin);
        this.append('access-control-allow-methods', methods);
    }
} // end of class

module.exports = Headers;