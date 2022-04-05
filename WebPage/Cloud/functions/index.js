const {
  totalReportsByWeek, 
  totalReportsByMonth, 
  totalReportsByTrimester, 
  totalReportsBySemester, 
  totalReportsByYear, 
  totalReportsForever
} = require("./getTimeChartsDataUtil.js");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const { response } = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
var serviceAccount = require("../miproyecto-5cf83-firebase-adminsdk-xu5ve-f682c370b5.json");

admin.initializeApp(
  {credential: admin.credential.cert(serviceAccount)}
);
const db = admin.firestore();

const printError = (error) => {
  console.log("\x1b[31m", error);
  console.log("\x1b[0m");
};

//getMapData
app.get("/mapData", async (request, response) => {
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

//getTypeChartsData
app.get("/typeChartsData", async (request, response) => {
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
  catch(error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getTimeChartsData
app.get("/timeChartsData", async (request, response) => {
  try {
    const queryParams = request.query;
    const period = queryParams["period"];

    let timeChartsData = undefined;
    switch(period){
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
      case "DE_POR_VIDA":
        timeChartsData = await totalReportsForever(db);
        break;
    }

    return response.status(200).json(timeChartsData);
  }
  catch(error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getReportById
app.get("/report/:reportId", async (request, response) => {
  try {
    const doc = await db.collection("reports").doc(request.params.reportId).get();
    const report = doc.data();

    return response.status(200).json(report);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getAllFunctionaries
app.get("/functionaries", async (request, response) => {
  try {
    const querySnapshot = await db.collection("functionaries").get();

    return response.status(200).json(querySnapshot.docs.map((doc) => doc.data()));
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//createFunctionary
app.post("/functionaries", async (request, response) => {
  try {
    const requestBody = request.body;
    const id = requestBody["id"];

    // The future db document should not have the id as a field
    delete requestBody["id"];
    // Create reference to the functionaries collection
    const functionariesRef = db.collection("functionaries");
    // Add a new document to the collection with the specified id
    const writeResult = await functionariesRef.doc(id).set(requestBody);

    return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//updateFunctionary
app.patch("/functionaries/:functionaryId", async (request, response) => {
  try {
    const id = request.params.functionaryId;
    const requestBody = request.body;
    const isMaster = requestBody["isMaster"];

    // Create reference to the functionaries collection
    const functionariesRef = db.collection("functionaries");
    // Update the document by id
    const writeResult = await functionariesRef.doc(id).update({isMaster: isMaster});

    return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//deleteFunctionary
app.delete("/functionaries/:functionaryId", async (request, response) => {
  try {
    const id = request.params.functionaryId;

    // Create reference to the functionaries collection
    const functionariesRef = db.collection("functionaries");
    // Delete the document by id
    const writeResult = await functionariesRef.doc(id).delete();

    return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getAllReports
app.get("/reports", async (request, response) => {
  try {
    const doc = await db.collection("reports").get();
    const reports = [];
    let id = 1;
    let reporte = undefined;
    doc.forEach((item ) => {
      let imagenes = [];
      let imag = [];
      reporte = item.data();
      reporte["id"] = id;
      if(reporte["images_ids"] != null ){
        imag.push(reporte["images_ids"].split(",")); 
        for(let x = 0; x < imag.length; x++){
          for(let y = 0; y < imag[x].length; y++){
            if (imag[x][y] != "") {
              imagenes.push(imag[x][y]);
            }
          }
        }
        reporte["imagenes"]= imagenes;
        reporte["hasFotos"] = true;
      }
      else {
        reporte["hasFotos"] = false;
        reporte["imagenes"]= imagenes;
      }
      reporte["fotourl"] = item.id
      reporte["hora"] = reporte["fecha_hora"].split(" | ")[1];
      reporte["fecha"] = reporte["fecha_hora"].split(" | ")[0];
      reports.push(reporte);
      id += 1;
    });
  
    reports.sort(function(a,b) {
      return new Date(b.fecha) - new Date(a.fecha);
    })


    return response.status(200).json(reports);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getAllCops
app.get("/cops", async (request, response) => {
  try {
    const querySnapshot = await db.collection("users").where("role", "==", "POLICIA").get();

    return response.status(200).json(querySnapshot.docs.map((doc) => doc.data()));
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//createCop
app.post("/cops", async (request, response) => {
  try {
    const requestBody = request.body;
    const id = requestBody["id"];
    
    // The future db document should not have the id as a field
    delete requestBody["id"];
    // Create reference to the users collection
    const usersRef = db.collection("users");
    // Add a new document to the collection with the specified id
    const writeResult = await usersRef.doc(id).set(requestBody);

    return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//updateCop
app.patch("/cops/:copId", async (request, response) => {
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

//deleteCop
app.delete("/cops/:copId", async (request, response) => {
  try {
    const id = request.params.copId;

    // Create reference to the users collection
    const usersRef = db.collection("users");
    // Delete the document by id
    const writeResult = await usersRef.doc(id).delete();

    return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//notification
app.post("/notification", async (request, response) => {
  try {

    const queryParams = request.query;
    const title = queryParams["title"]
    const description = queryParams["description"]

    console.log("este es el token",admin.messaging().getToken());
    var FCMToken = "AAAAM0G-m9Q:APA91bEShPUHNT5yKa4I-pGc902vpEaV-nOr7bUTbbe0PqZnc88abktPlEvkHYLwKjxogOxUIlbbmqNiwytL0loXb2dpuwVdUDTBWw-aI_vTtfIO2zbqvJHase8CrJ8ZT8DGyJldayUU"
    var payload = {
      notification: {
        title: "This is a Notification",
        body: "This is the body of the notification message."
      }
    };
    const message = {
      data: {
        title: 'title',
        body: 'description',
      }
    }
    var options = {
      priority: "high",
      timeToLive: 60 * 60 *24
    };
    try{

      admin.messaging().sendToDevice(FCMToken, message, options).then(function(response){
        console.log("sirvio",response )
      }).catch(function(error){
        console.log("no sirvio", error)
      })
    }catch(error){
      printError(error)
    }

     //const response = admin.messaging().send(FCMToken,payload,options)//.then(function(response){
    //   console.log("Successfully sent message:", response);
    // }).catch(function(error) {
    //   console.log("Error sending message:", error);
    // });

    

    //functions.logger.info('FCM Message', payload)

    // https://firebase.google.com/docs/cloud-messaging/send-message#send-messages-to-multiple-devices

    //return response.status(200).send(writeResult);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

//getReportsByFilter
app.get("/reportByFilter", async (request, response) => {
  try {
    const queryParams = request.query;
    const lowerDate = queryParams["lowerDate"].replace("-", "/");
    const upperDate = queryParams["upperDate"].replace("-", "/");
    const reportType = queryParams["reportType"];
    
    const lowerDateObject = new Date(lowerDate);
    const upperDateObject = new Date(upperDate);

    let docs = undefined;
    (reportType != "TODOS") ?
      (docs = await db.collection("reports").where("tipo_reporte", "==", reportType).get()) :
      (docs = await db.collection("reports").get());
    
    const reports = [];
    let id = 1;
    docs.forEach((item) => {
      report = item.data();
      reportDate = report["fecha_hora"].split(" | ")[0];
      reportDateObject = new Date(reportDate);
      let imagenes = [];
      let imag = [];
      reporte = item.data();
      reporte["id"] = id;
      if(reporte["images_ids"] != null ){
        imag.push(reporte["images_ids"].split(",")); 
        for(let x = 0; x < imag.length; x++){
          for(let y = 0; y < imag[x].length; y++){
            if (imag[x][y] != "") {
              imagenes.push(imag[x][y]);
            }
          }
        }
        reporte["imagenes"]= imagenes;
        reporte["hasFotos"] = true;
      }
      else {
        reporte["hasFotos"] = false;
        reporte["imagenes"]= imagenes;
      }
      reporte["fotourl"] = item.id
      reporte["hora"] = reporte["fecha_hora"].split(" | ")[1];
      reporte["fecha"] = reporte["fecha_hora"].split(" | ")[0];

      if (reportDateObject >= lowerDateObject && reportDateObject <= upperDateObject) {
        reports.push(reporte);
        id += 1;
      }
    });

    return response.status(200).json(reports);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

exports.app = functions.https.onRequest(app);

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

// exports.sendNotification = functions.database.ref("users/{docId}").onWrite( event =>{
//   const payload = {
//     notification: {
//       title: `New message by `,
//       body: text
//         ? text.length <= 100 ? text : text.substring(0, 97) + "..."
//         : ""
//     }
//   };
//   return admin.database().ref("users/{docID}").once('value').then(data => {
//     if(data.val().notificationKey){
//       return admin.messaging().sendToDevice(data.val().notificationKey, payload)
//     }

//   })
// }
 
// )