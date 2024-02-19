const ObjectId = require('mongodb').ObjectId;
const {getDb} = require('../utils/database');




// database instance
const db = getDb();

// collection
const COLLECTION = 'users';


/**
 * Saves a user to the database
 * @param username
 * @param password
 * @returns {Promise<ObjectId>}
 */
async function saveUser(username, password) {
    const result = await db.collection(COLLECTION).insertOne({
        username: username,
        password: password,
        streams: [],
        files: []
    })

    return result.insertedId;
}


module.exports = {
    saveUser: saveUser
}
