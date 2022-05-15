const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const admin = require("firebase-admin");
const { db } = require("../firebaseConfig.js");
const { firebaseApp } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// Functionaries CRUD

const functionaries = express();
functionaries.use(cors({ origin: true }));
const bodyParser = require('body-parser');
functionaries.use(bodyParser.json());
functionaries.use(bodyParser.urlencoded({extended:true}));


// getFunctionaries
functionaries.get("/", async (request, response) => {
    try {
        const querySnapshot = await db.collection("functionaries").get();

        return response.status(200).json(querySnapshot.docs.map((doc) => {
            const functionaryObj = doc.data();
            functionaryObj["id"] = doc.id;

            return functionaryObj;
        }));
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// createFunctionary
functionaries.post("/", async (request, response) => {
    try {
        const requestBody = request.body;
        const functionaryId = requestBody["id"];

        // The id should not be a field of the new functionary document
        delete requestBody["id"];
        // Create reference to the functionaries collection
        const functionariesRef = db.collection("functionaries");
        // Add a new document to the collection with the id obtained from the front-end
        const writeResult = await functionariesRef.doc(functionaryId).set(requestBody);

        return response.status(200).send(writeResult);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});


// updateFunctionary
functionaries.patch("/:functionaryId", async (request, response) => {
    try {
        const id = request.params.functionaryId;
        const requestBody = request.body;
        const isMaster = requestBody["isMaster"];

        // Create reference to the functionaries collection
        const functionariesRef = db.collection("functionaries");
        // Update the document by id
        const writeResult = await functionariesRef.doc(id).update({ isMaster: isMaster });
        console.log(writeResult);

        return response.status(200).send(writeResult);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// deleteFunctionary
functionaries.delete("/:functionaryId", async (request, response) => {
    try {
        const id = request.params.functionaryId;

        /* Delete the functionary from the functionaries Firestore collection */

        // Create reference to the functionaries collection
        const functionariesRef = db.collection("functionaries");
        // Delete the document by id
        const writeResult = await functionariesRef.doc(id).delete();

        /* Delete the functionary from the authentication tier in Firebase */

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

exports.functionariesTest = functionaries; 
exports.functionaries = functions.https.onRequest(functionaries);