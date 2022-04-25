// Dependencies
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
const cors = require("cors");
const nodemailer = require("nodemailer");
var generator = require("generate-password");

// Use Express.ja with cloud functions
const app = express();

// Enable Cross Origin to prevent CORS error when doing request from the front-end
app.use(cors({ origin: true }));

// Initialize the firebase app
var serviceAccount = require("./miproyecto-5cf83-firebase-adminsdk-xu5ve-f682c370b5.json");
const { google } = require("googleapis");

const firebaseApp = admin.initializeApp(
  { credential: admin.credential.cert(serviceAccount) }
);

// Obtain the firestore reference in order to query and manage the db
const db = admin.firestore();

const printError = (error) => {
  console.log("\x1b[31m", error);
  console.log("\x1b[0m");
};

// getMapData
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

// getTypeChartsData
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
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

// getTimeChartsData
app.get("/timeChartsData", async (request, response) => {
  try {
    const queryParams = request.query;
    const period = queryParams["period"];

    let timeChartsData = undefined;
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

// getReportById
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

// getAllFunctionaries
app.get("/functionaries", async (request, response) => {
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
app.post("/functionaries", async (request, response) => {
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
app.patch("/functionaries/:functionaryId", async (request, response) => {
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
app.delete("/functionaries/:functionaryId", async (request, response) => {
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

// getAllReports
app.get("/reports", async (request, response) => {
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

// getAllCops
app.get("/cops", async (request, response) => {
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
app.post("/cops", async (request, response) => {
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

// deleteCop
app.delete("/cops/:copId", async (request, response) => {
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

// notification
app.post("/notification", async (request, response) => {
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
    } catch (error) {
      printError(error)
    }
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

// getReportsByFilter
app.get("/reportByFilter", async (request, response) => {
  try {
    const queryParams = request.query;
    const lowerDate = queryParams["lowerDate"].replace("-", "/");
    printError(lowerDate)
    const upperDate = queryParams["upperDate"].replace("-", "/");
    printError(upperDate)
    const tipo_reporte = queryParams["reportType"];
    printError(tipo_reporte)

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

exports.sendNotification = functions.https.onRequest(async (request, response) => {
  try {
    let title = null;
    ({ title } = request.body)

    title.replace("_", " ");
    const usersRef = await db.collection("users").where("role", "==", "POLICIA").where("enServicio", "==", "true").get();
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
    } catch (error) {
      printError(error)
    }
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

app.get("/password", (request, response) => {
  try {
    const password = generator.generate({
      length: 15,
      numbers: true
    });

    return response.status(200).json({password: password});
  }
  catch (error) {
    return response.status(500).send(error);
  }
});

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

// notifyFunctionaryPassword
app.post("/functionaries/:email", async (request, response) => {
  try {
    const email = request.params.email;
    const password = request.body.password;

    const accessToken = await oAuth2Client.getAccessToken();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Visión Civil - Cuentas" <visioncivilweb@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido a Visión Civil Web!", // Subject line
      text: `Estimado funcionario ${email}
              Usted acaba de ser registrado en la plataforma de Visión Civil Web. Para ingresar a la plataforma utilice la siguiente contraseña: ${password}
              Le recomendamos encarecidamente que una vez ya tenga acceso, cambie su contraseña por medio de la interfaz de Visión Civil Web.
              Cordialmente, el equipo de Visión Civil`,
      html: `<p align="center"><img src="cid:img1" width="300"/></p>
              <h2>Estimado funcionario <i>${email}</i></h2>
              <p>Usted acaba de ser registrado en la plataforma Visión Civil Web. Para ingresar a la plataforma utilice la siguiente contraseña: <b>${password}</b></p>
              <p>Le recomendamos encarecidamente que una vez ya tenga acceso, cambie su contraseña por medio de la interfaz de Visión Civil Web.</p>
              <p>Cordialmente, el equipo de Visión Civil</p>`,
      attachments: [
        {
          filename: "logoAndText.png",
          path: "https://raw.githubusercontent.com/VisionCivil/Tesis-2022-10/main/images/logoAndText.png",
          cid: "img1"
        }
      ]
    });

    console.log("Message sent: %s", info.messageId);

    return response.status(200).json(info);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});

// notifyCopPassword
app.post("/cops/:email", async (request, response) => {
  try {
    const email = request.params.email;
    const password = request.body.password;

    const accessToken = await oAuth2Client.getAccessToken();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Visión Civil - Cuentas" <visioncivilweb@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido a Visión Civil Mobile!", // Subject line
      text: `Estimado policía ${email}
              Usted acaba de ser registrado en la aplicación móvil de Visión Civil. Para ingresar a la app utilice la siguiente contraseña: ${password}
              Le recomendamos encarecidamente que una vez ya tenga acceso, cambie su contraseña por medio de la interfaz de la aplicación.
              Cordialmente, el equipo de Visión Civil`,
      html: `<p align="center"><img src="cid:img1" width="300"/></p>
              <h2>Estimado policía <i>${email}</i></h2>
              <p>Usted acaba de ser registrado en la aplicación móvil de Visión Civil. Para ingresar a la app utilice la siguiente contraseña: <b>${password}</b></p>
              <p>Le recomendamos encarecidamente que una vez ya tenga acceso, cambie su contraseña por medio de la interfaz de la aplicación.</p>
              <p>Cordialmente, el equipo de Visión Civil</p>`,
      attachments: [
        {
          filename: "logoAndText.png",
          path: "https://raw.githubusercontent.com/VisionCivil/Tesis-2022-10/main/images/logoAndText.png",
          cid: "img1"
        }
      ]
    });

    console.log("Message sent: %s", info.messageId);

    return response.status(200).json(info);
  }
  catch (error) {
    printError(error);
    return response.status(500).send(error);
  }
});