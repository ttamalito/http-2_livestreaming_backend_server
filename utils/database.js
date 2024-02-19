// contains the logic to connect to mongodb
const {MongoClient} = require('mongodb');

// connection url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

let db;

/**
 * Connects to the database asynchrousnously
 * @returns {Promise<void>}
 */
async function connectToDataBase() {
        await client.connect()
        //connected succesfully
        console.log(`Connected to the MongoDb database sucsessfully on port 27017`);
        db = client.db('livestream');

}


function getDb() {
    if (!db) {
        // there is no database
        throw new Error(`Trying to access a not connected database`);
    }
    // else all good
    return db;
}

module.exports = {
    connectToDataBase: connectToDataBase,
    getDb: getDb
}