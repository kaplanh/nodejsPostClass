"use strict";

/* -----------------------------------------
EXPRESSJS
*/

/*
* $npm init -y
* $npm i express dotenv

 */

/* ExpressJS Start */

const express = require("express"); // Assing expressFramework to express variable.
//express Framework'ü express değişkenine atama.
const app = express(); // run application on express.
// uygulamayı express'te çalıştırıyoruz.

/* ENV */
require("dotenv").config();
