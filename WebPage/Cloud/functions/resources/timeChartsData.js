const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const {
    totalReportsByWeek,
    totalReportsByMonth,
    totalReportsByTrimester,
    totalReportsBySemester,
    totalReportsByYear
} = require("../util/getTimeChartsDataUtil.js");
const { db } = require("../firebaseConfig.js");
const functions = require("firebase-functions");

// getTimeChartsData
const timeChartsData = express();
timeChartsData.use(cors({ origin: true }));
timeChartsData.get("/", async (request, response) => {
    try {
        const queryParams = request.query;
        const period = queryParams["period"];

        let timeChartsData;
        switch (period) {
            case "ESTA_SEMANA":
                timeChartsData = await totalReportsByWeek(db);
                break;
            case "ESTE_MES":
                timeChartsData = await totalReportsByMonth(db);
                break;
            case "ESTE_TRIMESTRE":
                timeChartsData = await totalReportsByTrimester(db);
                break;
            case "ESTE_SEMESTRE":
                timeChartsData = await totalReportsBySemester(db);
                break;
            case "ESTE_AÑO":
                timeChartsData = await totalReportsByYear(db);
                break;
        }

        return response.status(200).json(timeChartsData);
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});

exports.timeChartsDataTest = timeChartsData;
exports.timeChartsData = functions.https.onRequest(timeChartsData);