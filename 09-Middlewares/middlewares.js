"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
//? Middleware functions must be has three parameters.
//? Last parameter is for next().

//* next() önceden tanimli bir callback fonksiyon -for next Function:

// Middleware:
//1- ayni path e sahip birden fazla fonksiyon yaziyoruz dogal olarak ilk karsilstigini yakalayip onun res.send() ne varsa onu basiyor altindakileri basmiyor fakat biz üstteki fonksina veya fonksiyona  ismi önemli olmasada piyasada next olarak kullanilan 3.bir parametre daha ekleyip res.send() üzerinde bu fonksiyonu yazinca res.send() icindeki ciktiyi degil bir sonraki fonksiyona geciyor onda next() yoksa onun res.semd() deki ciktiyi basiyor next() varsa yine bir sonraki fonksina geciyor
// 2-bu gecislerde 1.fonksiyondaki req ve res oldugu gibi 2.fonksiyona tasiniyor eger biz next() den önce bu degerleri degistirirsek veya yeni deger atarsak degismis sekli ile gecilen fonksiyona  o verileri gönderebiliriz

app.get("/", (req, res, next) => {
    // Request/Response parametresi ile next() metoduna veri gönderebilirim.
    req.customData = "Custom Data With Request";
    res.customDataWithResponse = "Custom Data With Response";

    next(); // Go to next Function.

    // next() komutundan sonra çıktı vermek anlamsız olacaktır. (Hata verecektir.)
    res.send({
        message: "Middleware running",
    });
});

app.get("/", (req, res) => {
    res.send({
        customData: [req.customData, res.customDataWithResponse],
        message: "Welcome to Home",
    });
});

/* ------------------------------------------------------- *
//* next() for next callBackFunction:

const middleFunction1 = (req, res, next) => {
    // console.log( req.query )
    const skip = req.query.skip ?? false;

    req.customData = "Custom Data With Request";
    res.customDataWithResponse = "Custom Data With Response";

    if (skip) {
        // Bir sonraki route'a (bağımsız fonksiyona) git:
        next("route");
        // res.redirect("/sec");//skip varsa /sec e git redirect örnrgi
    } else {
        // Bir sonraki callback fonksiyona git:
        next();
    }
};

const middleFunction2 = (req, res, next) => {
    // next()

    res.send({
        customData: [req.customData, res.customDataWithResponse],
        message: "Here is func2, next() runned",
    });
};

// //? add to function like callBack:
// app.get('/', middleFunction1, middleFunction2, (req, res) => { ... }
// //? It can be in array:
app.get("/", [middleFunction1, middleFunction2], (req, res) => {
    res.send({
        customData: [req.customData, res.customDataWithResponse],
        message: "Welcome to Home",
    });
});

// next('route') ile çalıştı:
app.get("/", (req, res) => {
    res.send({
        message: "next route",
    });
});

/* ------------------------------------------------------- *
//* Middlewares & use():

const middleFunction1 = (req, res, next) => {

    // console.log( req.query )
    const skip = req.query.skip ?? false

    req.customData = 'Custom Data With Request'
    res.customDataWithResponse = 'Custom Data With Response'

    if (skip) {
        
        // Bir sonraki bağımsız fonksiyona git:
        console.log('next-route çalıştı')
        next('route')

    } else {
        // Bir sonraki callback fonksiyona git:
        console.log('next çalıştı')
        next()
    }
}

const middleFunction2 = (req, res, next) => {

    // next()
    
    res.send({
        customData: [
            req.customData,
            res.customDataWithResponse
        ],
        message: "Here is func2, next() runned"
    });

}
// alttaki iki fonks ayni anlamda
// app.use(middleFunction1) // default-url = * tüm url lere gelen istekler icin calis
// app.use('/*', middleFunction1) // default-url = *

// app.use('/path', middleFunction1) // /path == /path/* sadece /path e gelen istekler icin calis

// app.use(middleFunction1, middleFunction2)
app.use( [ middleFunction1, middleFunction2 ] )

app.get('/*', (req, res) => {
    res.send({
        message: 'Welcome to Home'
    })
})

/* ------------------------------------------------------- *
//* Calling middlewares from file:

// const [ middleFunction1, middleFunction2 ] = require('./middlewares/index.js')
// const [ middleFunction1, middleFunction2 ] = require('./middlewares/index')
// const [ middleFunction1, middleFunction2 ] = require('./middlewares/')
// app.use(middleFunction1, middleFunction2)

// const middleFunctions = require('./middlewares/')
// app.use(middleFunctions)

app.use(require("./middlewares/"));

app.get("/*", (req, res) => {
    res.send({
        message: "Welcome to Home",
    });
});

// redirect /sec icin örnek
// app.get("/sec", (req, res) => {
//     res.send({
//         message: "next route",
//     });
// });

/* ------------------------------------------------------- */
// ?admin icin middleware örnegi
// 1-ya bu sekilde önce require yapar sonra methodun icnde fonksnu calistiririm yada asagidaki gibi app.use() ivinde require yapar kullanirim

const [isAdmin] = require("./middlewares/"); // fonksiyonu buraya cagirdim

app.get("/", isAdmin, (req, res) => {
    //burada kullandim
    res.send("Welcome!");
});

app.get("/", (req, res) => {
    res.status(403).send("Access denied");
});
// app.use() next('route') u desteklemez o nedenle üstteki gibi callback seklinde yazilmali
// app.use(require("./middlewares/index")); //fonksiyonu hem cagirdim hemde kullandim

// app.get("/", (req, res) => {
//     res.send("Welcome!");
// });

// app.get("/", (req, res) => {
//     res.status(403).send("Access denied");
// });
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
