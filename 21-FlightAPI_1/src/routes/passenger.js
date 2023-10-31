"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/passenger:

const permissions = require("../middlewares/permissions");
const passenger = require("../controllers/passenger");

// URL: /passengers

router.route("/").get(permissions.isAdmin, passenger.list).post(passenger.create);

router
    .route("/:id")
    .get(permissions.isLogin, passenger.read)
    .put(permissions.isLogin, passenger.update)
    .patch(permissions.isLogin, passenger.update)
    .delete(permissions.isAdmin, passenger.delete);

/* ------------------------------------------------------- */
module.exports = router;
