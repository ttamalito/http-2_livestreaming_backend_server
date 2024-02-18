

class LiveUsersMap {
    constructor() {
        /**
         * Holds all the currently live streams
         * @type {Map<String, [String]>} String to file descriptor
         *
         * */
        this.map = new Map()
    }

    /**
     * Adds the user to the map with an empty array
     * @param {String} user
     *
     */
    addLiveUser(user) {
        this.map.set(user, []);
    }

    /**
     * Checks if a user has a files assigned, i.e., it is currently livestreaming
     * @param {String} user
     * @returns {Boolean} true if the user has files assigned
     */
    hasFiles(user) {
        return this.map.has(user);
    }

    /**
     * Removes a user from the map
     * @param {String} user
     */
    removeLiveUser(user) {
        this.map.delete(user)
    }


    /**
     * Returns a filename at a given position
     * @param {String} user
     * @param {number} index
     * @returns {String}
     */
    getFileAtIndex(user, index) {
        const files = this.map.get(user);
        if (files.length <= index) {
            // index out of bound exception
            throw new Error(`Trying to access a file that is not present in map`);
        }
        // else all good
        return files[index];
    } // end of function

    /**
     * Appends a filename to the array of files for a given user
     * @param user
     * @param filename
     */
    appendFilename(user, filename) {
        const files = this.map.get(user);
        files.push(filename);
        this.map.set(user, files);
    }

    /**
     * Get the length of the files array
     * @param user
     * @returns {number} the length
     */
    getLengthOfFiles(user) {
        return this.map.get(user).length;
    }
} // end of class

const liveMap = new LiveUsersMap();
module.exports = liveMap;