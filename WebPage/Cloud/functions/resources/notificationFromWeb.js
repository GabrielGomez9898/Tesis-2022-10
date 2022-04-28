const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const admin = require("firebase-admin");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// sendNotificationFromWeb
const notificationFromWeb = express();
notificationFromWeb.use(cors({ origin: true }));
notificationFromWeb.post("/", async (request, response) => {
    try {
        const queryParams = request.query;
        const title = queryParams["title"];
        const description = queryParams["description"];

        const usersRef = await db.collection("users").get();
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
                title: title,
                body: description
            }
        };
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        try {
            tokens.map((item, i) => {
                admin.messaging().sendToDevice(item, payload, options).then(function (response) {
                    console.log("sirvio", response)
                }).catch(function (error) {
                    console.log("no sirvio", error)
                })
            })
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

exports.notificationFromWeb = functions.https.onRequest(notificationFromWeb);