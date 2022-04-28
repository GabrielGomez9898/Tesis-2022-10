const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

const mapData = express();
mapData.use(cors({ origin: true }));
mapData.get("/", async (request, response) => {
    try {
        const queryParams = request.query;
        const lowerDate = queryParams["lowerDate"].replaceAll("-", "/");
        const upperDate = queryParams["upperDate"].replaceAll("-", "/");
        const reportType = queryParams["reportType"];

        const lowerDateObject = new Date(lowerDate);
        const upperDateObject = new Date(upperDate);

        let docs = undefined;
        (reportType != "TODOS") ?
            (docs = await db.collection("reports").where("tipo_reporte", "==", reportType).get()) :
            (docs = await db.collection("reports").get());

        const mapData = [];
        docs.forEach((doc, i) => {
            report = doc.data();
            reportDate = report["fecha_hora"].split(" | ")[0];
            reportDateObject = new Date(reportDate);

            if (reportDateObject >= lowerDateObject && reportDateObject <= upperDateObject) {
                mapData.push({ "lat": report["latitude"], "lng": report["longitude"], "reportType": report["tipo_reporte"] });
            }
        });

        return response.status(200).json(mapData);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

exports.mapData = functions.https.onRequest(mapData);