"use strict";
/******************************************************** *
NODEJS;
/******************************************************** *

//* bizim requestlerimizi atacagimiz bir server lazim Node.js de bu hizmeti gören modulün adi http modulüdür bu builtin olarak nodejs de vardir ve cagrilip kullanilabilir npm instal http e gerek yok

// const http = require('./http')
// biz normalde böyle cagiriyorduk ama burda fiziksel adresi belirtmedik bu durumda nodejs bilgisayardaki global(npm list - g)ortama bakar ve ordaki default modulerde arar, bulamazsa nodemodules dosyasi icinde arar
// böyle builten moduller node: ön eki ile yazilir bunu gören diger developperlar bunun builtin oldugunu npm install e gerek olmadigini anlarlar
// const http = require('http')

// ?Server Olusturma

//*1-server olusturan modulü degiskene atiyoruz
//const http = require("node:http");
// Node:http linkine ctrl basip tiklarsam http.d.ts dosyasi acilir bu documantation acilir ve kodun aciklamalarini yansitir
// *2- icinde 2 parametresi olan bir callback fonksiyon alan http.createServer(req,res)  metodu ile servere i olusturuyoruz isimler önemli degil alan request basta response arkada olmak zorunda

// gelen istekleri servere request ile ,cliente cevaplari response ile verecegiz
// http.createServer((req, res) => {...}) piyasada bu sekilde yazilir
// const app=http.createServer((request, response) => {
//     response.end('Welcome to NodeJS Server')//bitti metodunu icin end() kullanilir
// })

// olusan bu serverin localhosttan gelen verileri alabilmesi icin  icine bir port birde callback alan  listen() metodunu yaziyorum bunu yazmassam sistem kitlenir döner durur cikti ver dememiz lazim

//app.listen(8000, () => console.log('Server Runned:http://127.0.0.1:8000'))

//* localhost id her zaman = 127.0.0.1 dir degistitilemez
// * biz 8000 degeri vererek 127.0.0.1: 8000 localhost:8000 de ayni seydir biri domain biri bu domaine karsilik gelen ip 
// *portunu dinle diyoruz

//?createServer(),end() listen() html tag i kullanma toplu sekilde 
const http = require('http')
const app = http.createServer((req, res) => {
    // res.end("Welcome to NodeJS Server");
    // dilersek end() icine html kodlariyla mesaj yazabilirim örnegin
    res.end("<h1>Welcome to NodeJS Server</h1>");
})

app.listen(8000, () => console.log('Server Runned: http://127.0.0.1:8000'))

// http://127.0.0.1:8000  == http://localhost:8000

// linke tiklayarak verdigi cevabi görebiliriz

/******************************************************** *
//? req,res icerini görmek icin
// const http = require("http");
// const app = http.createServer((req, res) => {
//     console.log(req); //requestin icinde ne var terminalde görmek icin
//     console.log(res); //response'un icinde ne var terminalde görmek icin
//     res.end("<p>Server is running</p>");
// });

// app.listen(8000, () => console.log("Server Runned:http://127.0.0.1:8000"));

// ?rurl e göre pageleri icin görmek if-else if -else 
const http = require("http");
const app = http.createServer((req, res) => {

    console.log(req.url);
    if (req.url == "/") {
        res.end("<h1>Main Page</h1>");
    } else if (req.url == "/second") {
        res.end("<h1>Second Page</h1>");
    } else {
        res.end("<h1>Server is running</h1>");
    }

    // console.log(req); //requestin icinde ne var terminalde görmek icin
    // console.log(res); //response'un icinde ne var terminalde görmek icin
});

app.listen(8000, () => console.log("Server Runned:http://127.0.0.1:8000"));

/******************************************************** *
// ?res.write() and res,end() birden fazla mesaji basma
const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            // res.end('1')//1.calisir ve cikar end metodu blok metoddur calisir cikar 2. calismaz blocking yapar
            // res.end('2')
            res.write("* satir1"); //bu sekilde birden fazla mesaji biriktirip sonunda res.end() ile yazdirabilirim
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"));
/******************************************************** *

// ?status codes
const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            res.statusCode = 404 //default 200 dür ben birsey yazmassam 200 cikar
            res.statusMessage='Not Found'//default OK dur 
            
            res.write("* satir1"); 
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"));//callback vermek zorunda degiliz terminaldede görmek icin yazdik yani sadece listen(8000) yazsakta olurdu

    // Not: metodun üzerine mouse u getirip bekledigimizde parametrelerin basinda ? varsa o zorunlu degil anlamindadir
/******************************************************** *

// ?response olarak Header gönderme 
const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            res.setHeader('Content-Type', 'text/html')//baslik,deger ciftleri seklnde 
            res.setHeader('another-header', 'another-value')//limit yok birden fazla header gönderebilirim,
           
            
            res.write("* satir1"); 
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"))
/******************************************************** *
// ?apiye method gönderme sadece get islemine izin verme örnegi
const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            res.setHeader('Content-Type', 'text/html')//baslik,deger ciftleri seklnde 
            res.setHeader('another-header', 'another-value')//limit yok birden fazla header gönderebilirim,
           
            
            res.write("* satir1"); 
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else if (req.url == '/api') {
            if (req.method=='GET') { //urlde apiye gidip sorgulama metodum GET ise GET diye bir mesaj GET disinda ise elsedeki mesaji alacagim 
                res.end('GET')
            } else {
                res.end('Not supporting different method.')
            }
            
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"))


/******************************************************** *
// ?write() ve header() komutlarini kisaca writeHead() ile ayni anda yazma

const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            res.statusCode = 404; //default 200 dür ben birsey yazmassam 200 cikar
            res.statusMessage = "Not Found"; //default OK dur

            res.setHeader("Content-Type", "text/html"); //baslik,deger ciftleri seklnde
            res.setHeader("another-header", "another-value"); //limit yok birden fazla header gönderebilirim,

            res.write("* satir1");
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else if (req.url == "/api") {
            if (req.method == "GET") {
                // yukarda status code ve header i ayri ayri yazmistik burda writehead() ikisini ayni anda tanimladim.

                res.writeHead(200,"Status Message", {//1.parametre status code,2. status message,3.header
                    "Content-Type": "application/json",
                    "another-header": "another-value",
                });
                res.end("OK");

                // OVERLOAD GOOD EXAMPLE  üstteki 3 parametreli alttaki 2 parametreli
                res.writeHead(200, {//1.parametre status code,2. status message,3.header
                    "Content-Type": "application/json",
                    "another-header": "another-value",
                });
                res.end("OK");
            } else {
                res.end("Not supporting different method.");
            }
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"));

/******************************************************** *
// ?bir objeyi json olarak response la gönderme

const http = require("http");
const app = http
    .createServer((req, res) => {
        if (req.url == "/") {
            res.statusCode = 404; //default 200 dür ben birsey yazmassam 200 cikar
            res.statusMessage = "Not Found"; //default OK dur

            res.setHeader("Content-Type", "text/html"); //baslik,deger ciftleri seklnde
            res.setHeader("another-header", "another-value"); //limit yok birden fazla header gönderebilirim,

            res.write("* satir1");
            res.write("* satir2");
            res.write("* satir3");
            res.end();
        } else if (req.url == "/api") {
            if (req.method == "GET") {
                // yukarda status code ve header i ayri ayri yazmistik burda writehead() ikisini ayni anda tanimladim.

                res.writeHead(200,"Status Message", {//1.parametre status code,2. status message,3.header
                    "Content-Type": "application/json",
                    "another-header": "another-value",
                });
                // objeyi tanimladim

                const obj = {
                    result: true,
                    message:'islem basarili.'

                }


                // json a cevirip cikti gönderdim
                res.end(JSON.stringify(obj))



                res.end("OK");

                // OVERLOAD GOOD EXAMPLE  üstteki 3 parametreli alttaki 2 parametreli
                res.writeHead(200, {//1.parametre status code,2. status message,3.header
                    "Content-Type": "application/json",
                    "another-header": "another-value",
                });
                res.end("OK");
            } else {
                res.end("Not supporting different method.");
            }
        } else {
            res.end("Server is running");
        }
    })
    .listen(8000, console.log("http://127.0.0.1:8000"));




/******************************************************** *
// ?bir bütün olarak nodejs server örnegi
const http = require("http");
const app = http.createServer((req, res) => {
    if (req.url == "/") {
        res.statusCode = 404; // Default: 200
        res.statusMessage = "Not Found"; // Default: OK

        res.setHeader("Content-Type", "text/html");
        res.setHeader("another-header", "another-value");

        res.write("* Satır1");
        res.write("* Satır2");
        res.write("* Satır3");
        res.end();
    } else if (req.url == "/api") {
        if (req.method == "GET") {
            // res.writeHead(200, {
            //     'Content-Type': 'application/json',
            //     'another-header': 'another-value',
            // })

            // OVERLOAD GOOD EXAMPLE:
            res.writeHead(200, "Status Message", {
                "Content-Type": "application/json",
                "another-header": "another-value",
            });

            const obj = {
                result: true,
                message: "İşlem Başarılı.",
            };

            res.end(JSON.stringify(obj));
        } else {
            res.end("Not supporting different method.");
        }
    } else {
        res.end("Server is running");
    }
});
app.listen(8000, () => console.log("http://127.0.0.1:8000"));

/* -------------------------------------------- */

// ?.ENV
// bazen disardan harici bir dosyadan yazilimin icine veriler göndermem gerekebilir ve bu veriler özel okunamayan verilerdir
// iste bunun yolu .env dosyasidir

// not:linuxde bir doya olustururken basina.koyarsak bu dosya gizli dosyadir  gizli

// *bunu iki sekilde yapabiliriz


// *1.yol
// terminalde
//  node index.js  ile veriyi index.js dosyamin icine gönderiyorum

// $ ENV_NAME = ENV_VALUE
// process.env.ENV_NAME


// sonra index.js icinde ile veriyi yakaliyorum

// *2.yol dotenv modulu yardimi ile
// terminalde asagidaki kodla modulü yüklüyoruz
//* $ npm i dotenv //bu module .env dosyasindaki verileri yakalamami saglayan module
// sonra.env dosyasi olusturup büyük harflerle bir degidken deger cifti yaziyoruz

// daha sonra index.js gibi dosyamda cagiriyorum
//* require('dotenv').config()

// ve dosyamin basina bunu yazip cagiracagim
//* const PORT = process.env.PORT ?? 8000

/****************************************** */
// $ ENV_NAME=ENV_VALUE node index.js
// console.log( process.env.ENV_NAME )

// get ENV_VARS from .env file:
require("dotenv").config(); // $ npm i dotenv // https://www.npmjs.com/package/dotenv
// console.log(process.env); 
console.log("NODE_ENV:", process.env.NODE_ENV); 
console.log("ENV_HOST:", process.env.ENV_HOST + ':' + process.env.ENV_PORT); 
console.log("ENV_EXAMPLE_STR:", process.env.ENV_EXAMPLE_STR); 
console.log("ENV_EXAMPLE_TXT:", process.env.ENV_EXAMPLE_TXT.split(' ')); 

/****************************************** */

// get ENV_VARS from .env file:
require("dotenv").config(); // $ npm i dotenv // https://www.npmjs.com/package/dotenv
// console.log( process.env.PORT )

// const PORT = process.env.ENV_PORT || 8000 // false or 8000
const PORT = process.env.ENV_PORT ?? 8000 // (undefined or null) or 8000

http.createServer((request, response) => {

    response.end('<h1> Welcome to NodeJS Server </h1>')

}).listen(PORT, () => console.log(`Server Runned: http://127.0.0.1:${PORT}`))
