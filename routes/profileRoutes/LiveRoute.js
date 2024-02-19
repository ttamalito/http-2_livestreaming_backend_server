const AbstractRoute = require('../AbstractRoute')
const separatePath = require('../../utils/separetePath');
const routes = require('../routes');
const fs = require('node:fs');
const liveMap = require('../../utils/LiveUsersMap');

/**
 * Route to start the livestreaming, (the creator should visit this page)
 */
class LiveRoute extends AbstractRoute {
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

    async controller(req, res, stream, headers) {
        // get the content length
        let contentLength;
        try {
            contentLength = Number(req.headers['content-length'])
        } catch (error) {
            // the provided content length is not a number
            stream.respond({
                ':status': 411 // length required
            }, {endStream: true});
            // end the stream
            stream.end(() => {console.log(`Stream was closed with 411 status code response`)});
        }
        // get the username, so that we can store the livestream
        const username = separatePath(req.url)[0];
        // check if there is a fileDescriptor for the user already
        let index;
        let fileToOpen = `./liveVideoStreams/${username}/`;
        // the filename to be saved
        let filename;
        if (liveMap.hasFiles(username)) {
            // it has some files, get the amount of files
            index = liveMap.getLengthOfFiles(username);
            filename = `${username}_file_${index}.webm`
            fileToOpen = fileToOpen + filename;

        } else {
            index = 0;
            // there are no files
            filename = `${username}_file_${index}.webm`
            fileToOpen = fileToOpen + filename;
            liveMap.addLiveUser(username); // add it to the map, with an empty array
        }
        // check if there is a directory for the stream for that user
        if (!fs.existsSync(`./liveVideoStreams/${username}`)) {
            // there is no directory for that user
            // create the new directory
            fs.mkdirSync(`./liveVideoStreams/${username}`);
        }
        // continue wwith the requesst
        let bytesReceived = 0; // amount of bytes from the payload that were received so far
        // add an event handler to the stream, to receive data
        stream.on('data', chunk => {

            // append the file
            fs.appendFileSync(fileToOpen, chunk); // append
            // add this to the bytes received
            bytesReceived += chunk.length;
            // check if that is all the content that we need to receive
            if (contentLength === bytesReceived) {
                // we read everything that was send, add it to the files
                liveMap.appendFilename(username, filename);
                // end the stream
                stream.end(() => {console.log(`Stream ${stream.id} received all the ${bytesReceived} bytes, so it was closed`)});
            }

        }) // end of data

        // allow the content type headers
        headers.append('access-control-allow-headers', 'content-type');
        // set the status to no content
        headers.setStatus(204);
        // no payload data will be sent
        stream.respond(headers.getHeaders(), {endStream: true});
        // do not close it as more data will come through the stream
    }


}

const liveRoute = new LiveRoute('POST', '/:user/live', true);
// add it to the array
routes.push(liveRoute);