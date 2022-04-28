const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// getTypeChartsData
const typeChartsData = express();
typeChartsData.use(cors({ origin: true }));
typeChartsData.get("/", async (request, response) => {
    try {
        const queryParams = request.query;
        const lowerDate = queryParams["lowerDate"].replaceAll("-", "/");
        const upperDate = queryParams["upperDate"].replaceAll("-", "/");

        const lowerDateObject = new Date(lowerDate);
        const upperDateObject = new Date(upperDate);

        const docs = await db.collection("reports").get();

        const reportsOnDateRange = [];
        docs.forEach((doc, i) => {
            report = doc.data();
            reportDate = report["fecha_hora"].split(" | ")[0];
            reportDateObject = new Date(reportDate);

            if (reportDateObject >= lowerDateObject && reportDateObject <= upperDateObject) {
                reportsOnDateRange.push(report["tipo_reporte"]);
            }
        });

        const typeChartsData = {
            hurtoViviendaNum: reportsOnDateRange.filter((val) => val === "HURTO_VIVIENDA").length,
            hurtoPersonaNum: reportsOnDateRange.filter((val) => val === "HURTO_PERSONA").length,
            hurtoVehiculoNum: reportsOnDateRange.filter((val) => val === "HURTO_VEHICULO").length,
            vandalismoNum: reportsOnDateRange.filter((val) => val === "VANDALISMO").length,
            violacionNum: reportsOnDateRange.filter((val) => val === "VIOLACION").length,
            homicidioNum: reportsOnDateRange.filter((val) => val === "HOMICIDIO").length,
            agresionNum: reportsOnDateRange.filter((val) => val === "AGRESION").length,
            otroNum: reportsOnDateRange.filter((val) => val === "OTRO").length
        };

        return response.status(200).json(typeChartsData);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

exports.typeChartsData = functions.https.onRequest(typeChartsData);