const admin = require('firebase-admin');
const serviceAccount = require('./creds.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const ValidKey = async (key, usr) => {
    
}
// Add item
// Add an item 
// Item:
//  title
//  notes
//  userKey

// Remove item
// By title

// Get item list
// return all pantry items with user key

// Get item detailed
// from title, get title and notes.

//Validate Usr and Key
// use the login api

module.exports = {
    ValidKey: ValidKey,
    AddItem: AddItem,
    GetItem: GetItem,
    GetItemList: GetItemList,
    DeleteItem: DeleteItem
}

