"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
// npm i swagger-autogen
// swaggerAutogen(outputFile, routes, document); 3 parametre aliyor onlari düzenleyip icine koyuyorum oda bana json olusturuyor
// https://swagger-autogen.github.io/docs/
/* ------------------------------------------------------- *
*autogen default ayarlari degistirmek icin  ama defauultu kullan
const options = {
	openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
	language:         <string>,     // Change response language.                      By default is 'en-US'
	disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
	autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
	autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
	autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
	writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */

// const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {//*3 parametreden ilki olan documenti olusturuyorum
    // info: {
    // 	version: "1.0.0",
    // 	title: "Personnel API",
    // 	description: "Personnel Management API Service",
    // 	termsOfService: "http://www.clarusway.com",
    // 	contact: { name: "Clarusway", email: "qadir@clarusway.com" },
    // 	license: { name: "BSD License", },
    // },
    info: {//*yukaridaki gibi elle yazabilecegim gibi package.json dan da cekebilirim
        version: packageJson.version,
        title: packageJson.title,
        description: packageJson.description,
        termsOfService: "http://www.clarusway.com",
        contact: { name: packageJson.author, email: "qadir@clarusway.com" },
        license: { name: packageJson.license },
    },
    host: `${HOST}:${PORT}`,//*host bilgilerini .env den cekiyorum
    basePath: "/",//*ana url
    schemes: ["http", "https"],//*hangi protokolle calisabilecegini belirliyorum
    // JWT Settings:
    securityDefinitions: {//*hangi güvenlik metodunu kullandigimi ve aciklamasini yaziyorum
        JWT: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description:
                "Entry Your AccessToken (JWT) for Login. Example: <b>Bearer <i>...token...<i></b>",
        },
    },
    security: [{ JWT: true }],//*güvenlik tipi
    definition: {
        //*swagger daki en alttaki def bölümü icin auth ve refresh modelini elle yazdim
        "/auth/login": {
            username: {
                type: "String",
                required: true,
            },
            password: {
                type: "String",
                required: true,
            },
        },
        "/auth/refresh": {
            "token.refresh": {
                description: "{ token: { refresh: ... } }",
                type: "String",
                required: true,
            },
        },
        // "Department": {
        // 	"name": {
        // 		type: "ObjectId",
        // 		required: true
        // 	}
        // },
        Department: require("./src/models/department.model").schema.obj, //*Department modelini elle yazmamak icin buraya cektim
        Personnel: require("./src/models/personnel.model").schema.obj, //*Personnel modelini elle yazmamak icin buraya cektim
    },
};

const routes = ['./index.js']//*2.parametre olan routes icin index.js in yolunu verdim
const outputFile = './swagger.json'//*3.parametre olan outputFile a json i buraya olustur dedim

// Create JSON file:
swaggerAutogen(outputFile, routes, document)//*routes a git document te belirtigim ayarlara göre outputFile:swagger.json a yaz dedim

//* NOT:burda sadece swagger-Autogen araciligiyla  swagger in görüntülemek icin bekledigi  json dosyasini swagger.json mi olusturdum görüntülemek icin index.js de swagger-ui-express modülünü kullanacagim bunun icin  index.js e git 