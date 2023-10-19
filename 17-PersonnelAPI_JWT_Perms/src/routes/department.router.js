"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department.controller");
const permissions = require("../middlewares/permissions");

// URL: /departments

router
    .route("/")
    .get(permissions.isLogin, department.list)//login olan department i listeleyebilir
    .post(permissions.isAdmin, department.create);//admin olan departman ekleme yapabilir

router
    .route("/:id")
    .get(permissions.isAdminOrLead, department.read) //admin veya lead olan o departmanda okuma yapabilir
    .put(permissions.isAdminOrLead, department.update) //admin veya lead olan o departmanda güncelleme yapabilir
    .patch(permissions.isAdminOrLead, department.update)
    .delete(permissions.isAdmin, department.delete);//adminolan o departmanda silme yapabilir

router.get("/:id/personnels", permissions.isAdminOrLead, department.personnels);//

/* ------------------------------------------------------- */
module.exports = router;
