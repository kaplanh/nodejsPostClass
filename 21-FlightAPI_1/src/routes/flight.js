"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/flight:

const permissions = require("../middlewares/permissions");
const flight = require("../controllers/flight");

// URL: /flights

router.route("/").get(permissions.isAdmin, flight.list).post(flight.create);

router
    .route("/:id")
    .get(permissions.isLogin, flight.read)
    .put(permissions.isLogin, flight.update)
    .patch(permissions.isLogin, flight.update)
    .delete(permissions.isAdmin, flight.delete);

/* ------------------------------------------------------- */
module.exports = router;
