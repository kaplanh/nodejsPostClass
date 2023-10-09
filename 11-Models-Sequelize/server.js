"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ?express den app olusturmak icin
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// ?Gelen json veriyi yakalamak icin
// Accept json data & convert to object:
app.use(express.json());

// app.all("/", (req, res) => {
//     res.send("welcome to todo api");
// });

/* ------------------------------------------------------- */
app.use(require("./todo.router"));

// app.use(require("./todo.model..aciklamali"));
/* ------------------------------------------------------- */
// const asyncHandler = require("express-async-handler");
// const { isMapIterator } = require("util/types");

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500;
    res.status(errorStatusCode).send({
        error: true,
        message: err.message,
        cause: err.cause,
        stack: err.stack,
    });
};
app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
