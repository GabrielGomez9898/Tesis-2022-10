const { printError } = require("../util/loggingUtil.js");
const admin = require("firebase-admin");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// sendNotificationFromMobile
exports.notificationFromMobile = functions.https.onRequest(async (request, response) => {
    try {
        let title = null;
        ({ title } = request.body)

        title.replace("_", " ");
        const usersRef = await db.collection("users").where("role", "==", "POLICIA").where("enServicio", "==", true).get();
        let user = undefined;
        let tokens = [];
        usersRef.forEach((item) => {
            user = item.data();
            if (user["phoneToken"] != null) {
                tokens.push(user["phoneToken"]);
            }
        })

        var payload = {
            notification: {
                title: "Nuevo reporte!",
                body: "De tipo : " + title
            }
        };
        var options = {
            priority: "high",
            //timeToLive: 60 * 60 *24
        };
        try {
            tokens.map((item, i) => {
                admin.messaging().sendToDevice(item, payload, options).then(function (response) {
                    console.log("sirvio", response)
                }).catch(function (error) {
                    console.log("no sirvio", error)
                })
            })
            response.set("Access-Control-Allow-Origin", "*");
            return response.status(200).send();
        } catch (error) {
            printError(error)
        }
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});