"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();

const personnel = require("../controllers/personnel.controller");

//URL:/departments//router in kontrol ettigi url

router
    .route("/") ///departments/
    //index.jsde /departments yazmis olacagiz burda departments den sonra ana sayfaya gelen get isteginedepartment.list bakacak
    .get(personnel.list)
    .post(personnel.create);

router
    .route("/:id") ///departments/id
    .get(personnel.read)
    .put(personnel.update)
    .patch(personnel.update)
    .delete(personnel.delete);


module.exports = router;
