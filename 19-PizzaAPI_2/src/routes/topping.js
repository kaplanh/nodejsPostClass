"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/topping:

const permissions = require("../middlewares/permissions");
const topping = require("../controllers/topping");

// URL: /toppings

// router.route('/')
//     .get(permissions.isAdmin, topping.list)
//     .post(permissions.isAdmin, topping.create)

// router.route('/:id')
//     .get(permissions.isAdmin, topping.read)
//     .put(permissions.isAdmin, topping.update)
//     .patch(permissions.isAdmin, topping.update)
//     .delete(permissions.isAdmin, topping.delete)

router.use(permissions.isAdmin); //malzeme listesine ekleme cikarma silme tüm islemleri sadece admin olan yapsin diyorsak tüm metodlara ayri ayri permissions yazmak yerine bunu yazmam yeter

router.route("/").get(topping.list).post(topping.create);

router
    .route("/:id")
    .get(topping.read)
    .put(topping.update)
    .patch(topping.update)
    .delete(topping.delete);

/* ------------------------------------------------------- */
module.exports = router;
