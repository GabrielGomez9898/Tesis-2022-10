const admin = require("firebase-admin");

// Initialize and export the firebase app
const serviceAccount = require("./miproyecto-5cf83-firebase-adminsdk-xu5ve-f682c370b5.json");
exports.firebaseApp = admin.initializeApp(
    { credential: admin.credential.cert(serviceAccount) }
);

// Obtain the firestore reference in order to query and manage the db
exports.db = admin.firestore();