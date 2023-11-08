"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ mkdir logs
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i jsonwebtoken morgan
*/
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Run Logger:
app.use(require("./src/middlewares/logger"));
// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))


/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "Welcome to PIZZA API",
        
    });
});

const auth2 = require("./src/middlewares/authentication");

// user:
app.use('/users', require('./src/routes/user'))
// pizza:
app.use('/pizzas',auth2, require('./src/routes/pizza'))
/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */

