const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const admin = require("firebase-admin");
const { db } = require("../firebaseConfig.js");
const { firebaseApp } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// Cops CRUD

const cops = express();
cops.use(cors({ origin: true }));
const bodyParser = require('body-parser');
cops.use(bodyParser.json());
cops.use(bodyParser.urlencoded({extended:true}));

// getCops
cops.get("/", async (request, response) => {
    try {
        const querySnapshot = await db.collection("users").where("role", "==", "POLICIA").get();

        return response.status(200).json(querySnapshot.docs.map((doc) => {
            const copObj = doc.data();
            copObj["id"] = doc.id;

            return copObj;
        }));
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// createCop
cops.post("/", async (request, response) => {
    try {
        const requestBody = request.body;
        const copId = requestBody["id"];

        // The id should not be a field of the new cop document
        delete requestBody["id"];
        // Create reference to the users collection
        const usersRef = db.collection("users");
        // Add a new document to the collection with the id obtained from the front-end
        const writeResult = await usersRef.doc(copId).set(requestBody);

        return response.status(200).send(writeResult);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// updateCop
cops.patch("/:copId", async (request, response) => {
    try {
        const id = request.params.copId;
        const requestBody = request.body;

        // Create reference to the users collection
        const usersRef = db.collection("users");
        // Update the document by id
        const writeResult = await usersRef.doc(id).update(requestBody);

        response.status(200).send(writeResult);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// deleteCop
cops.delete("/:copId", async (request, response) => {
    try {
        const id = request.params.copId;

        /* Delete the cop from the cops Firestore collection */

        // Create reference to the users collection
        const usersRef = db.collection("users");
        // Delete the document by id
        const writeResult = await usersRef.doc(id).delete();

        /* Delete the cop from the authentication tier in Firebase */

        // Delete the user with the provided uid and managing success and failure with .then() and .catch()
        admin.auth(firebaseApp).deleteUser(id).then((promiseResponse) => {
            return response.status(200).send(writeResult);
        }).catch((error) => {
            printError(error);
            return response.status(500).send(error);
        });
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

exports.copsTest = cops;
exports.cops = functions.https.onRequest(cops);