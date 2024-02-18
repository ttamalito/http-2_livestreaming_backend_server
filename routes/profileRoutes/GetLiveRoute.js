const AbstractRoute = require('../AbstractRoute')
const separatePath = require('../../utils/separetePath');
const routes = require('../routes');
const fs = require('node:fs');
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
        // create a readable stream
        const readableStream = fs.createReadStream(`./liveVideoStreams/${username}.webm`, {
            highWaterMark: 16*1024
        })
        // set the event listener
        readableStream.on('data', chunk => {
            // write the read data to the stream
            stream.write(chunk);
        });

        // add event to finish the stream
        readableStream.on('end', () => {
            // close the stream
            stream.end(() => {console.log(`The stream has been closed, all the data was sent`)});
        })
        //stream.respondWithFile(`./liveVideoStreams/${username}.webm`, headers.getHeaders(), {length: 20000000}); // read 20 mill bytes
    }


} // end of class GETLiveRoute

const getLiveRoute = new GetLiveRoute('GET', '/:user/live', true);
// add it to the array
routes.push(getLiveRoute);