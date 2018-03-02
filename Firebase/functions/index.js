const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getRides = functions.https.onRequest((req, res) => {
    // Grab the parameters.
    const requestBody = req.body;

    console.log('- request parameters:', requestBody);
    
    return res.send("{Ok}");

    // // Push the new message into the Realtime Database using the Firebase Admin SDK.
    // return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    //   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //   return res.redirect(303, snapshot.ref);
    // });
  });