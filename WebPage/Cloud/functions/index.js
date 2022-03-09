const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getAllReports = functions.https.onRequest((request, response) => {
  const events = admin.firestore().collection("reports");
  events.get().then((querySnapshot) => {
    const tempDoc = [];
    querySnapshot.forEach((doc) => {
      tempDoc.push(doc);
    });
    response.set("Access-Control-Allow-Origin", "*");
    response.send(tempDoc);
  });
});
