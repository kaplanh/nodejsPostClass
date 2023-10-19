"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')//her modelde ayni mongoose objesini tekrar tekrar  olusturmak istemedigimizden (not:normalde bir obje bir yerde bir defa tanimlanir heryerde ayni isimde obje tekrar tekrar tanimlanmaz bu dogru degil ama sdc mongoose buna izin vermis bir güzellik yapmis) mongoose u buraya require edip exports ettik modellerde buradan require ederek cagirip kullanabiliriz

const dbConnection = function() {
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 