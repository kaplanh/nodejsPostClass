"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ROUTING
------------------------------------------------------- */

// const express = require("express");
// const router = express.Router()

const router = require("express").Router();

// middleware i direk yazip kullanmak icin böyle yazabiliriz yada asagidaki gibi bunu bir fonksiyona atayip router.use() ile calistirabiliriz
//* router icinde middleware in 1.yazim sekli
// router.use((req, res, next) => {
//     const { username, password } = req.query;
//     if (username === "clarusway" && password === "clarusway") {
//         next();
//     } else {
//         res.send({
//             message: "Wrong Username or password",
//         });
//     }
// });

//* router icinde middleware in 2.yazim sekli
const routeControl = (req, res, next) => {
    const { username } = req.query;

    if (username == "clarusway") {
        next();
    } else {
        res.send({
            message: "Wrong Username",
        });
    }
};

// We can use middleware with router:
router.use(routeControl);
/*-----------------------------------------------------------------------------*/
//* ayni application.route('/') da oldugu gibi router.route('/') da kullanabilir ve bu ayni url ait birden fazla method u tek bir url icin cagirabiliriz asagiya bakiniz

router
    .route("/extra")
    .get((req, res) => {
        res.send({ message: "get" });
    })
    .post((req, res) => {
        res.send({ message: "post" });
    })
    .put((req, res) => {
        res.send({ message: "put" });
    })
    .delete((req, res) => {
        res.send({ message: "delete" });
    });
/*-----------------------------------------------------------------------------*/

router.get("/", (req, res) => {
    res.send({ message: "All User" });
});
router.get("/login", (req, res) => {
    res.send({ message: "Login" });
});
router.get("/logout", (req, res) => {
    res.send({ message: "Logout" });
});
router.get("/:userId", (req, res) => {
    res.send({ message: "User Page" });
});
router.get("/:userId/password", (req, res) => {
    res.send({ message: "Password Page" });
});

module.exports = router;
