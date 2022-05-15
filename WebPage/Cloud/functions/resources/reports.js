const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// Reports section

const reports = express();
reports.use(cors({ origin: true }));

// getReports
reports.get("/", async (request, response) => {
    try {
        const doc = await db.collection("reports").get();
        const reports = [];
        let id = 1;
        let reporte = undefined;
        let color = "";
        doc.forEach((item) => {
            let imagenes = [];
            let imag = [];
            reporte = item.data();
            reporte["id"] = id;
            if (reporte["tipo_reporte"] === "HURTO_VIVIENDA") {
                color = "#00C3FF";
            }
            else if (reporte["tipo_reporte"] === "HURTO_PERSONA") {
                color = "#0059FF";
            }
            else if (reporte["tipo_reporte"] === "HURTO_VEHICULO") {
                color = "#006800";
            }
            else if (reporte["tipo_reporte"] === "VANDALISMO") {
                color = "#00FF62";
            }
            else if (reporte["tipo_reporte"] === "VIOLACION") {
                color = "#FF00FF";
            }
            else if (reporte["tipo_reporte"] === "HOMICIDIO") {
                color = "#FF0000";
            }
            else if (reporte["tipo_reporte"] === "AGRESION") {
                color = "#FF7B00";
            }
            else if (reporte["tipo_reporte"] === "OTRO") {
                color = "#000000";
            }
            if (reporte["images_ids"] != null) {
                imag.push(reporte["images_ids"].split(","));
                for (let x = 0; x < imag.length; x++) {
                    for (let y = 0; y < imag[x].length; y++) {
                        if (imag[x][y] != "") {
                            imagenes.push(imag[x][y]);
                        }
                    }
                }
                reporte["imagenes"] = imagenes;
                reporte["hasFotos"] = true;
            }
            else {
                reporte["hasFotos"] = false;
                reporte["imagenes"] = imagenes;
            }
            reporte["fotourl"] = item.id
            reporte["color"] = color;
            reporte["hora"] = reporte["fecha_hora"].split(" | ")[1];
            reporte["fecha"] = reporte["fecha_hora"].split(" | ")[0];
            reports.push(reporte);
            id += 1;
        });

        reports.sort(function (a, b) {
            return new Date(b.fecha) - new Date(a.fecha);
        })


        return response.status(200).json(reports);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

// getReportsByFilter
reports.get("/filters", async (request, response) => {
    try {
        const queryParams = request.query;
        const lowerDate = queryParams["lowerDate"].replace("-", "/");
        const upperDate = queryParams["upperDate"].replace("-", "/");
        const tipo_reporte = queryParams["reportType"];

        const lowerDateObject = new Date(lowerDate);
        const upperDateObject = new Date(upperDate);

        let docs = undefined;
        (tipo_reporte != "TODOS") ?
            (docs = await db.collection("reports").where("tipo_reporte", "==", tipo_reporte).get()) :
            (docs = await db.collection("reports").get());

        const reports = [];
        let id = 1;
        let color = "";
        docs.forEach((item) => {
            reporte = item.data();
            reportDate = reporte["fecha_hora"].split(" | ")[0];
            reportDateObject = new Date(reportDate);
            let imagenes = [];
            if (reporte["tipo_reporte"] === "HURTO_VIVIENDA") {
                color = "#00b7ff";
            }
            else if (reporte["tipo_reporte"] === "HURTO_PERSONA") {
                color = "#001aff";
            }
            else if (reporte["tipo_reporte"] === "HURTO_VEHICULO") {
                color = "#008000";
            }
            else if (reporte["tipo_reporte"] === "VANDALISMO") {
                color = "#4d0080";
            }
            else if (reporte["tipo_reporte"] === "VIOLACION") {
                color = "#ff00ff";
            }
            else if (reporte["tipo_reporte"] === "HOMICIDIO") {
                color = "#ff0000";
            }
            else if (reporte["tipo_reporte"] === "AGRESION") {
                color = "#ff8800";
            }
            else if (reporte["tipo_reporte"] === "OTRO") {
                color = "#000000";
            }
            let imag = [];
            reporte = item.data();
            reporte["id"] = id;
            if (reporte["images_ids"] != null) {
                imag.push(reporte["images_ids"].split(","));
                for (let x = 0; x < imag.length; x++) {
                    for (let y = 0; y < imag[x].length; y++) {
                        if (imag[x][y] != "") {
                            imagenes.push(imag[x][y]);
                        }
                    }
                }
                reporte["imagenes"] = imagenes;
                reporte["hasFotos"] = true;
            }
            else {
                reporte["hasFotos"] = false;
                reporte["imagenes"] = imagenes;
            }
            reporte["fotourl"] = item.id
            reporte["color"] = color;
            reporte["hora"] = reporte["fecha_hora"].split(" | ")[1];
            reporte["fecha"] = reporte["fecha_hora"].split(" | ")[0];

            if (reportDateObject >= lowerDateObject && reportDateObject <= upperDateObject) {
                reports.push(reporte);
                id += 1;
            }
        });

        reports.sort(function (a, b) {
            return new Date(b.fecha) - new Date(a.fecha);
        })

        return response.status(200).json(reports);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

exports.reportsTest = reports;
exports.reports = functions.https.onRequest(reports);