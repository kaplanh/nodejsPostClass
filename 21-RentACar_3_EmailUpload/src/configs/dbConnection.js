"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')

const dbConnection = function () {
    // Connect:
    mongoose
        .connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        //{ useNewUrlParser: true, useUnifiedTopology: true } mongoDB güncellenmis eski bazi özellikleri kullanmama karar almis biz bu kodla yeni özelliklere göre hareket edecegim degisiklerden haberim var diyorum
        .then(() => console.log("* DB Connected * "))
        .catch((err) => console.log("* DB Not Connected * ", err));
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 