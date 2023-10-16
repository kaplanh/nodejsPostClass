"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();

const department = require("../controllers/department.controller");

//URL:/departments//router in kontrol ettigi url

router
    .route("/") ///departments/
    //index.jsde /departments yazmis olacagiz burda departments den sonra ana sayfaya gelen get isteginedepartment.list bakacak
    .get(department.list)
    .post(department.create);

router
    .route("/:id") ///departments/id
    .get(department.read)
    .put(department.update)
    .patch(department.update)
    .delete(department.delete);


router.get("/:id/personnels", department.personnels);//bir departmandaki personneli listelemek icin

module.exports = router;
