/**
 * Separates the url by '/', and returns an array with the entries
 * @param {String} path
 * @returns {[String]} The array containing all the paths
 */
function separatePath(path) {
    const separated = path.split('/');
    separated.reverse();
    separated.pop();
    separated.reverse();
    return separated;
}


module.exports = separatePath;