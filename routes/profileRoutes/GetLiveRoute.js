const AbstractRoute = require('../AbstractRoute')
const separatePath = require('../../utils/separetePath');
const routes = require('../routes');
const fs = require('node:fs');
const liveMap = require('../../utils/LiveUsersMap')
/**
 * Route to fetch the livestream of a given user by the url
 */
class GetLiveRoute extends AbstractRoute {
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
            // its different path, should be /user/live/index,
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
        // print the headers
        const requestHeaders = req.headers;
        //console.log(requestHeaders)
        console.log(`Writable highh water mark: ${stream.writableHighWaterMark}`);
        // set the status OK
        headers.setStatus(200);
        // respond wiht the headers
        stream.respond(headers.getHeaders());
        // get the username, so that we can store the livestream
        const username = separatePath(req.url)[0];
        // check if the user has a stream
        let index = 0;
        let filename; // modify this to
        if (liveMap.hasFiles(username)) { // liveMap.hasFiles(username)
            filename = liveMap.getFileAtIndex(username, index);
        } else {
            // there is no stream for this user, so close the stream
            stream.end(()=> {console.log(`Stream ended because there is no livestream for that user`)})
            return;
        }
        // create a readable stream


        // read all the files
        readFile(stream, username, index);
    } // end of controller


} // end of class GETLiveRoute

const getLiveRoute = new GetLiveRoute('GET', '/:user/live/:index', true);
// add it to the array
routes.push(getLiveRoute);

/**
 * Reads a bunc of files recursively
 * @param stream
 * @param username
 * @param index
 */
function readFile(stream, username, index) {
    console.log(`We are reading a file with index : ${index}`);
    console.log(`For stream ${stream.id}`)
    // check if there are more files
    if (liveMap.getLengthOfFiles(username) <= index) {
        // end the stream
        stream.end(() => {
            console.log(`Recursive Stream: ${stream.id} ended`);
        })
        return;
    }

    const filename = liveMap.getFileAtIndex(username, index);
    const readableStream = fs.createReadStream(`./liveVideoStreams/${username}/${filename}`, {
        highWaterMark: 16*1024
    })
    // set the event listener
    readableStream.on('data', chunk => {
        stream.write(chunk);
    });

    // add event to finish the stream
    readableStream.on('end', () => {
        // call this function again
        console.log(`The readeable stream just ended, we should start a new one`)
        setTimeout(() => {
            // wait for 2 seconds before reading the next file
            readFile(stream, username, index + 1);
        }, 2000);
    })
} // end of function