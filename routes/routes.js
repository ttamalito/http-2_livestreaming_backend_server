// define a global array that holds all the routes objects

const AbstractRoute = require('./AbstractRoute');
const baseRoute = require('../routes/baseRoutes/BaseRoute');

/**
 * Array that holds all the routes objects
 * @type {AbstractRoute[]}
 */
const routes = [];


console.log(`We are adding the base route to the array!`)
// add it to the routes array
routes.push(baseRoute);
console.log(`This is the routes length: ${routes.length}`)


module.exports = routes;