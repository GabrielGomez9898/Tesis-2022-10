// At the top of test/index.test.js
const test = require('firebase-functions-test')({
    storageBucket: 'miproyecto-5cf83.appspot.com',
    projectId: "miproyecto-5cf83",
}, "./miproyecto-5cf83-6bf5b42a9bd8.json");

const { db } = require("../firebaseConfig.js");
const admin = require("firebase-admin");
const chai = require("chai");
const request = require('supertest');
const assert = require('assert');
const express = require('express');
//const bodyParser = require('body-parser');

// after firebase-functions-test has been initialized
const myFunctions = require('../index.js'); // relative path to functions code

const { notificationFromWebTest } = require("../resources/notificationFromWeb.js");
describe("POST /notificationFromWeb", () => {
    it("notificationFromWebTest", () => {
        return request(notificationFromWebTest)
            .post("/")
            .query({ title: "Prueba unitaria", description: "Esta notificación fue generada para una prueba unitaria" })
            .expect(200)
            .then((response) => {
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

describe("notificationFromMobile", () => {
    it("notificationFromMobile", () => {
        const request = {
            body: {
                title: "Prueba unitaria"
            }
        };
        const response = {
            redirect: (code, url) => {
                assert.equal(code, 200);
                done();
            }
        };

        myFunctions.notificationFromMobile(request, response);
    });
});

// Dashboard

const { mapDataTest } = require("../resources/mapData.js");
describe("GET /mapData", () => {
    it("mapDataTest", () => {
        return request(mapDataTest)
            .get("/")
            .query({ lowerDate: "2022-03-15", upperDate: "2022-05-14", reportType: "AGRESION" })
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 5);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

const { typeChartsDataTest } = require("../resources/typeChartsData.js");
describe("GET /typeChartsDataTest", () => {
    const expectedData = {
        hurtoViviendaNum: 2,
        hurtoPersonaNum: 1,
        hurtoVehiculoNum: 1,
        vandalismoNum: 1,
        violacionNum: 0,
        homicidioNum: 0,
        agresionNum: 5,
        otroNum: 2
    };

    it("typeChartsDataTest", () => {
        return request(typeChartsDataTest)
            .get("/")
            .query({ lowerDate: "2022-03-15", upperDate: "2022-05-14" })
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.deepEqual(response.body, expectedData);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

const { timeChartsDataTest } = require("../resources/timeChartsData.js");
describe("GET /timeChartsDataTest", () => {

    it("timeChartsDataTest", () => {
        return request(timeChartsDataTest)
            .get("/")
            .query({ period: "ESTA_SEMANA" })
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 7);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

// Reports

const { reportsTest } = require("../resources/reports.js");
describe("GET /reports", () => {
    it("reportsTest", () => {
        return request(reportsTest)
            .get("/")
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 13);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

describe("GET /reports", () => {
    it("reportsTest", () => {
        return request(reportsTest)
            .get("/filters")
            .query({ lowerDate: "2022-03-15", upperDate: "2022-05-14", reportType: "AGRESION" })
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 5);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

//Functionaries

const { functionariesTest } = require("../resources/functionaries.js");
//functionariesTest.use(bodyParser.json());
//functionariesTest.use(bodyParser.urlencoded({extended:true}));
describe("GET /functionaries", () => {
    it("functionariesTest", () => {
        return request(functionariesTest)
            .get("/")
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 12);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

describe("POST /functionaries", () => {
    const functionary = {
        id: "1",
        email: "pruebaunitaria@gmail.com",
        isMaster: true
    };

    it("functionariesTest", () => {
        return request(functionariesTest)
            .post("/")
            .set('Accept', 'application/json')
            .send(functionary)
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

//Cops

const { copsTest } = require("../resources/cops.js");
describe("GET /cops", () => {
    it("copsTest", () => {
        return request(copsTest)
            .get("/")
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.body.length, 1);
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});

describe("POST /cops", () => {
    const cop = {
        id: "1",
        birth_date: "1999-07-25",
        disponible: true,
        email: "policiapruebaunitaria@gmail.com",
        enServicio: false,
        gender: "Masculino",
        id_policia: "22222",
        name: "Richi",
        phone: 3106259532,
        role: "POLICIA"
    };

    it("copsTest", () => {
        return request(copsTest)
            .post("/")
            .set('Accept', 'application/json')
            .send(cop)
            .expect('Content-Type', /json/)
            .then((response) => {
                assert.equal(response.statusCode, 200);
            })
            .catch((error) => {
                console.log(error);
            })
    });
});