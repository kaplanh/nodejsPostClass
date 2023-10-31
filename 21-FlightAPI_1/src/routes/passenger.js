"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/passenger:

// const permissions = require("../middlewares/permissions");
const { isStaffOrAdmin } = require("../middlewares/permissions");
const passenger = require("../controllers/passenger");

// URL: /passengers
// router.use('./', permissions.isStaffOrAdmin)//yada router.use(permissions.isStafOrAdmin)
router.use(isStaffOrAdmin);

router.route("/").get(passenger.list).post(passenger.create);

router
    .route("/:id")
    .get(passenger.read)
    .put(passenger.update)
    .patch(passenger.update)
    .delete(passenger.delete);

/* ------------------------------------------------------- */
module.exports = router;
