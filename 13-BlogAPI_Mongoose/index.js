"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors
 * $ npm i mongoose
 */

// express
const express = require("express");
const app = express();

//dotenv

require("dotenv").config();

const PORT = process.env.PORT || 8000;
/*-------------------------------------------------------------*/
// express e json veri gönderecegimi ve bunu kabul edip object e döndürmesi istedigimi belirtiyorum
app.use(express.json());

// Connect to MongoDB with Mongoose:
require("./src/dbConnection");

// Home Page
app.all("/", (req, res) => {
    res.send("WELCOME TO BLOG API");
});

// Routes:
app.use("/blog", require("./src/routes/blogRoute"));

/*-------------------------------------------------------------*/
// errorHandler
app.use(require("./src/errorHandler"));

/*-------------------------------------------------------------*/
app.listen(PORT, () => console.log("Running on http://127.0.0.1:" + PORT));
