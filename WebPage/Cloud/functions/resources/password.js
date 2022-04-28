const express = require("express");
const cors = require("cors");
const { printError } = require("../util/loggingUtil.js");
const nodemailer = require("nodemailer");
var generator = require("generate-password");
const { google } = require("googleapis");
const functions = require("firebase-functions");

// Password section

const password = express();
password.use(cors({ origin: true }));

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// generatePassword
password.get("/", (request, response) => {
    try {
        const password = generator.generate({
            length: 15,
            numbers: true
        });

        return response.status(200).json({ password: password });
    }
    catch (error) {
        printError(error);
        return response.status(500).send(error);
    }
});


// notifyFunctionaryPassword
password.post("/functionaries/:email", async (request, response) => {
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
password.post("/cops/:email", async (request, response) => {
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

exports.password = functions.https.onRequest(password);