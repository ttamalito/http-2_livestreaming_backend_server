const Headers = require('../utils/Headers')

/**
 * Initializes the headers object, to be populated with headers along the way
 * @return {Headers}
 */
function initializeHeaders() {
    return new Headers(); // initialize the Headers object
}

module.exports = initializeHeaders;