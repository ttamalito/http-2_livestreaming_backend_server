# http/2 Livestreaming server
Back-End server that supports livestreaming using the core [http/2 module](https://nodejs.org/docs/latest/api/http2.html) from Node.js

There are more things to come, there a lot of things that could be added. They will come along in the future,
like using the standard protocol [HLS (HTTP Livestreaming)](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)

I built this in order to get used to working with the core http/2 module of Node.js, and to better understand the 
http/2 protocol and its advantages.

I built a really simple UI using react, just to have some visuals, the source code for that project can be found [in this repository](https://github.com/ttamalito/livestreaming-front-end)


## Features
* Livestreaming of video to multiple users
* Creating an account and saved in a NoSQL database (MongoDB)

## How it works
The server receives multiple request 2 seconds worth of video from the user that is livestreaming, to be saved in webm format.
Then it saves those chunks in different files, so that when a another users wants to watch the livestream the server serves
those files to the user.
This works fine because of the I/O architecture of Node.js, a feature that I want to add is multithreading 
(yes, Node.js has [a module](https://nodejs.org/docs/latest/api/worker_threads.html) to use multiple threads), as right now, this does not escalate for a lot of users.


## Run locally
If you wish to run this project locally, you would need a couple of things to make it work.
You might want to also clone the [front-end repository to have a SIMPLE visual of what is happening](https://github.com/ttamalito/livestreaming-front-end)
In order to have a communication between the back-end and the front-end, both of them need to have the same certificate and 
it has to be a certificate that your browser trusts, I used [mkcert](https://github.com/FiloSottile/mkcert) to make this work, you can find more information
on the repository.

## Requirements
* You need to have Node.js installed
* You need to have MongoDB installed

## Start the server
First make sure that you have all the dependencies installed, if not run npm install in your terminal to do so.
* execute: npm start in your terminal to start the server and see the livestreaming functionality

You can see the README.md file of the [front-end repository](https://github.com/ttamalito/livestreaming-front-end), to see more details about
the different urls that you can visit in the server




