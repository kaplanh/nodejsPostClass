"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */
/*
 * npm init -y
 * npm i express dotenv
 * npm i express-async-handler
 */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
NodeJS error code list ==>https://nodejs.org/api/errors.html
?syncrone fonksiyonlarda
*asagidaki kodda biz sisteme dedikki id NAN ise yani number degilse bir hata firlat id number sa ekrana statusCode:200 id :param.id yaz 
*hata durumunda biz herhangi birsey yazmazsak sistem kafasina göre bir hata basacak  bunun önüne gecmek icin try-catch blok ile hatayi catch(err) icinde yakalayip res.send({message:err.message}) ile  throw icinde firlatilan hata mesajini, couse:err.couse  ilede hata nedenini yakalayip istedigimiz bir sekilde json formatinda ekrana hata mesaji basmis olacagiz


*ama her hata icin try-catch yazmak cok zahmetli bir is bu nedenle express tipki catch gibi firlatilan hatayi yakalayan 4 parametli bir fonksiyona  yani errorHandler(err,req,res,next) a sahip hatalar err parametresinde yakalaniyor ve biz bunu alip istedigimiz gibi ekrana basabiliyoruz
*burda unutmamiz gereken sey bu next parametresinide barindirdigi icin bir middleware oluyor bu nedenle app e tanitmak icin app.use(errorHandler) yazmamiz gerekiyor

*unutulmamasi gereken diger sey bu errrorHandler fonksiyonu app.listen() dan önce ama digerlerinden sonra en altta yazilmali

*Not:hata varsa hata firlatirken bu hataya gelen statusCode da res.statusCode=400 gibi errorHandler a gönderebilirim Error handlerda bu statusCode u Const statusCode = res.statuscode  ile yakalayip res.send() in arasina yazabilirim yani
*Res.status(statusCode).send() ile ekrana basabilirim

*Not2:ben try-catch kullanip hatayi catch ile yakalayip basma isini errorhandler ile yapmak isteyebilirim o zamanda bu fonksiyona next parametresini ekleyip middle ware cevirip  res.send() calistirmak yerine next(err) ile hatayi errorHandler a paslayabilirim


? hata firlatip ekrana basma isini sisteme biraktigimiz kod
app.get("/user/:id", (req, res) => {
    const id = req.params.id ?? 0;
    if (isNaN(id)) {
        res.statusCode = 400;
        throw new Error("ID is Not A Number", { cause: "params.id=" + id });
    } else {
        res.statusCode = 200;
        res.send({
            error: false,
            id: id,
        });
    }
});

/* ------------------------------------------------------- *
? hata firlatip ekrana basma isini catch ile yakalayip ekrana bastigimiz kod
// TRY-CATCH:
// biz try-catch i nodejs eger bir hata varsa lütfen kendi kafana göre hareket etme demek hata yönetimini kontrol etmek icin kullaniriz
app.get('/user/:id', (req, res, next) => {

    try {
        const id = req.params.id ?? 0
        if (isNaN(id)) {
            throw new Error('ID is Not A Number', { cause: 'params.id='+id })
        } else {
            res.send({ 
                error: false, 
                id: id
            })
        }
    } catch (err) {

        console.log('try-catch runned')
        next(err) // Go to errorHandler()

        // res.send({ 
        //     error: true, 
        //     message: err.message,
        //     cause: err.cause
        // })
    }

})
/* ------------------------------------------------------- */
// ASYNC:
// ?asyncrone fonksiyonlarda
// *2- farkli sekilde yapabiliriz 1.si hata firlatan async fonksiyonu  method fonksiyonumuzda  bir middleware olarak yazip hata yoksa then varsa catch yapisindaki .catch() ile yakalayip icine next yazarak hatayi errorhandler a gönderebilirz
//* 2.si ise express - async - handler modulünü
// *$ npm i express-async-handler    komutu ile yükleyip  hatafirlatan fonksiyonu modulü aktardigimiz asyncHandler fonksiyonu icinde yazip hata durumunda errorHandler fonksiyonuna yönlendirecek

const asyncFunction = async () => {
    throw new Error("Created error in async-func");
};

//? Control with catch(next)
app.get("/async", async (req, res, next) => {
    await asyncFunction().catch(next); // Go to errorHandler()
});

/* ------------------------------------------------------- */
// express-async-handler
// $ npm i express-async-handler

const asyncHandler = require("express-async-handler");

app.get(
    "/async",
    asyncHandler(async (req, res, next) => {
        res.errorStatusCode = 400;
        throw new Error("Created error in async-func");
    })
);

/* ------------------------------------------------------- */
// ? hata firlatip ekrana basma isini errorHandler ile yakalayip ekrana bastigimiz kod
//? use(errorHandler) kodlamanın en sonunda yer almalı.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500; //express de oldugu icin statusCode yerine bu ismi yazdik

    console.log("errorHandler runned");

    res.status(statusCode).send({
        error: true, // special data
        message: err.message, // Error string Message
        cause: err.cause, // Error optional cause
        // stack: err.stack // Error Details.
    });
};
//? for run errorHandler call in use.
//? It must be at last middleware.
app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
