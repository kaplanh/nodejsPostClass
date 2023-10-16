"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
//Required Modules:
//envVariables to process.env
require("dotenv").config();
const PORT = process.env.PORT;
//asyncErrors to errorHandler
require("express-async-errors");
/* ------------------------------------------------------- */
//Configrations

//Connect to DB
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection(); //dbConnection bir fonksiyon olarak yazildigi icin calismasi icin cagirdiktan sonra bu sekilde calistirmam gerek
// biz bu nu middleware olarak tanimlasa idik middleware ler url gelmeden calismayacagi icin db url gelmeden DB ye baglanamayacaktik o nedenle fonksiyon olarak yazdik
/* ------------------------------------------------------- */
// Middlewares:
// Accesp JSON
// gelen json lari almak ve onlari objeye cevirmek icin
app.use(express.json()); //app.use('/',express.json()) bu sekildede yazilabilir ikisinde anlami ben bu json i bir url istegi geldigi zaman calistiracagim
//SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList()
app.use(require("./src/middlewares/findSearchSortPage"));
// bunu middleware yapmamin sebebi 1-req,res parammetrelerine ihtiyacim oldugundan 2-birden fazla modelde kullanabilmek ve kullandigim yerde ilgili modeli parametre olarak verebilmek icin
// *NOT:bir fonksiyonu birden fazla yerde kullacaksam veya indexedDB.js i kod kalabaligindan arindirmak istiyorsam middleware yada fonksiyon olarak yazar burda cagirir calistiririm; req ve res e ihtiyacim varsa middleware seklinde yazar middlewares klasörüne atarim app.use(require()) seklinde cagirir calistiririm  req,res e ihtiyacim yoksa fonksiyon olarak yazar helper klasörünün icine atar require() ile cagirir fonkName() ilede calistiririm

// /departmets
app.use("/departments", require("./src/routes/department.router"));

// continue from here...

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
// application umu yayina almak icin
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
