const AbstractRoute = require('../AbstractRoute')
const separatePath = require('../../utils/separetePath');
const routes = require('../routes');
const fs = require('node:fs');
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

    controller(req, res, stream, headers) {
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
            stream.close(() => {console.log(`Stream was closed with 411 status code response`)});
        }
        // get the username, so that we can store the livestream
        const username = separatePath(req.url)[0];
        let bytesReceived = 0; // amount of bytes from the payload that were received so far
        // add an event handler to the stream, to receive data
        stream.on('data', chunk => {
            console.log(`We recieved some data on stream ${stream.id}`);
           // console.log(chunk.toString());
            console.log(`Of size: ${chunk.length}`);
            // add this to the bytes received
            bytesReceived += chunk.length;
            // append the file
            fs.appendFileSync(`./liveVideoStreams/${username}.webm`, chunk);
            // check if that is all the content that we need to receive
            if (contentLength === bytesReceived) {
                // end the stream
                console.log(`The highwater mark is: ${stream.readableHighWaterMark}`)
                console.log(`The state of the stream`);
                console.log(stream.state)
                stream.end(() => {console.log(`Stream ${stream.id} received all the ${bytesReceived} bytes, so it was closed`)});
            }
        })

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