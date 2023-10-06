"use strict";
// not:vs code da new file deyip  middlewares/index.js  yazarsak hem middlewares klasörünü hemde icinde index.js i birlikte olusturmus olur
/*----------------------------------------
        EXPRESSJS_MIDDLEWARES
-------------------------------------- */

// 1.middleware fonks
const middleFunction1 = (req, res, next) => {
    // console.log(req.query);
    const skip = req.query.skip ?? false;

    req.customData = "Custom Data With Request";
    res.customDataWithResponse = "Custom Data With Response";

    if (skip) {
        // Bir sonraki bağımsız fonksiyona git:
        console.log("next-route çalişti");
        next("route");
    } else {
        // Bir sonraki callback fonksiyona git:
        console.log("next çalişti");
        next();
    }
};

// 2.middleware fonks

const middleFunction2 = (req, res, next) => {
    // next()

    res.send({
        customData: [req.customData, res.customDataWithResponse],
        message: "Here is func2, next() runned",
    });
};

// middleware fonksiyonlari exports ettik
module.exports = [middleFunction1, middleFunction2];

// object icindede gönderebilirim
// module.exports = {
//     middleFunction1: middleFunction1,
//     middleFunction2: middleFunction1,
// };

// ?admin icin middleware örnegi

const isAdmin = (req, res, next) => {
    const user = req.query.skip === "admin";
    console.log(req.query.skip, user);
    if (user) {
        next();
    } else {
        next("route");
    }
};

module.exports = [isAdmin];
