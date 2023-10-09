"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ?express den app olusturmak icin
const express = require("express");
const app = express();

// ?.env den veri cekebilmek icin
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// ?Gelen json veriyi yakalamak icin bu kodu calistirmaliyim yoksa gelen json datayi hemen almiyor bu middleware i kullanmaliyiz gelen veriyi req.body den alacagiz
// gelen json i kabul etme ve objeye cevirme isini bu kod yaoiyor
// Accept json data & convert to object:
app.use(express.json());

// app.all("/", (req, res) => {
//     res.send("welcome to todo api");
// });

/* ------------------------------------------------------- */
// ?router middleware i app e aktarmak icin (bu arada todo.model i router a aktardik o nedenle buraya aktarmaya gerek yok )
//* TodoModel moved to todo.model.js
app.use(require("./todo.router"));

// app.use(require("./todo.model..aciklamali"));
/* ------------------------------------------------------- */
//?errorHandler-hatalari yakalayip istedigim gibi json formatta hata yayinlaak icin

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
