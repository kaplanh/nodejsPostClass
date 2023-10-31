"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:

const permissions = require("../middlewares/permissions");
const reservation = require("../controllers/reservation");

// URL: /reservations

router
    .route("/")
    .get(permissions.isAdmin, reservation.list)
    .post(reservation.create);

router
    .route("/:id")
    .get(permissions.isLogin, reservation.read)
    .put(permissions.isLogin, reservation.update)
    .patch(permissions.isLogin, reservation.update)
    .delete(permissions.isAdmin, reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
