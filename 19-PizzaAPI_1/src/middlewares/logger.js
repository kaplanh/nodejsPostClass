"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i morgan
// app.use(logger):

const morgan = require("morgan");
const fs = require("node:fs");

const now = new Date(); //Mon Oct 23 2023 13:15:01 GMT+0200 (Orta Avrupa Yaz Saati)
const today = now.toISOString().split("T")[0]; //2023-10-23

module.exports = morgan("combined", {
    stream: fs.createWriteStream(`./logs/${today}.log`),
});

// **********************date methodu toISOString()*******************************

// const now = new Date();

// console.log(now);        //Mon Oct 23 2023 13:15:01 GMT+0200 (Orta Avrupa Yaz Saati)
// console.log(now.toISOString())           //2023-10-23T11:15:01.834Z
// console.log(now.toISOString().split("T"))      //['2023-10-23', '11:15:01.834Z']
// console.log(now.toISOString().split("T")[0])      //2023-10-23

//******************************************************************************* */
