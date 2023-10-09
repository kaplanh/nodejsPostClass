"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ROUTING
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//? "Router" is special app for URL control in ExpressJS.

//*altta app i kullanarak router yapisi kurduk
// app.get("/", (req, res) => {
//     res.send({ message: "Home Page" });
// });
// app.get("/about", (req, res) => {
//     res.send({ message: "About Page" });
// });
// app.get("/user/:userId", (req, res) => {
//     res.send({ message: "User Page" });
// });

//burdaki app express framwork ünün sahip oldugu tüm özelliklere sahip route yapisi olustururken bu özelliklerin hepsini cagirmama gerek yok express in icinde router yapisi icin özel bir fonks var onu cagirmam yeter bunun icin
//* const router =express.Router() demem yeterli

// *altta express.Router() kullanrak router yapisi kurduk
// Send routing to Router:
// const router = express.Router();
// router.get("/", (req, res) => {
//     res.send({ message: "Home Page" });
// });
// router.get("/about", (req, res) => {
//     res.send({ message: "About Page" });
// });
// router.get("/user/:userId", (req, res) => {
//     res.send({ message: "User Page" });
// });

// *router yapisini baska bir dosyada kurduk o dosyada exports yaptik burdada require yapip kullandik
// // Router to App:
// app.use(router);

// *1.yöntem
// const router = require('./routes/')
// app.use(router)

// *2. ve kisa yöntem
// app.use(require("./routes/"));

// *app.use() da  app.use('path', require('/./routes/user')) seklinde bir path de belirtebiliyorum dolayisiyla diger dosyadan gelen router bu pathin altinda olmus oluyor

app.use("/user", require("./routes/user"));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
